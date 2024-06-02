from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
import subprocess
import models
from models import SessionLocal, engine

# Create all database tables
models.Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware to allow requests from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,  # Allow credentials
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)


# Pydantic model for code submission
class CodeSubmission(BaseModel):
    code: str  # Field for the code to be executed


# Dependency to get DB session
def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/api/test-code")
def test_code(submission: CodeSubmission) -> dict:
    """
    Endpoint to test the submitted code. Executes the code and returns the output or error.
    """
    try:
        # Run the submitted code using a subprocess
        result = subprocess.run(
            ["python3", "-c", submission.code],
            capture_output=True,
            text=True,
            timeout=20,  # Increased timeout to 20 seconds
        )
        # Check if the code execution was successful
        if result.returncode != 0:
            raise HTTPException(status_code=400, detail=result.stderr)
        # Return the output of the code execution
        return {"output": result.stdout}
    except subprocess.TimeoutExpired:
        raise HTTPException(status_code=400, detail="Code execution timed out.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/submit-code")
def submit_code(submission: CodeSubmission, db: Session = Depends(get_db)) -> dict:
    """
    Endpoint to submit the code. Executes the code, and if successful, stores the code and output in the database.
    """
    try:
        # Run the submitted code using a subprocess
        result = subprocess.run(
            ["python3", "-c", submission.code],
            capture_output=True,
            text=True,
            timeout=20,  # Increased timeout to 20 seconds
        )
        # Check if the code execution was successful
        if result.returncode != 0:
            raise HTTPException(status_code=400, detail=result.stderr)

        # Persist code and output to the database
        db_submission = models.CodeSubmission(
            code=submission.code, output=result.stdout
        )
        db.add(db_submission)
        db.commit()
        db.refresh(db_submission)

        # Return the output of the code execution
        return {"output": result.stdout}
    except subprocess.TimeoutExpired:
        raise HTTPException(status_code=400, detail="Code execution timed out.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
