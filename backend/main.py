from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import subprocess

# Create an instance of the FastAPI class
app = FastAPI()

# Add CORS middleware to allow requests from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from any origin
    allow_credentials=True,  # Allow cookies to be included in cross-origin requests
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)


# Define a Pydantic model for the request body
class CodeSubmission(BaseModel):
    code: str  # The code to be executed, provided as a string


# Define a POST endpoint at the path "/api/test-code"
@app.post("/api/test-code")
def test_code(submission: CodeSubmission):
    try:
        # Use subprocess to run the provided code in a new Python process
        result = subprocess.run(
            ["python3", "-c", submission.code],  # Command to run the code using python3
            capture_output=True,  # Capture the output (stdout and stderr)
            text=True,  # Capture the output as text (string) instead of bytes
            timeout=5,  # Set a timeout of 5 seconds for the code execution
        )
        # Check the return code of the subprocess
        if result.returncode != 0:
            # If the return code is non-zero, raise an HTTPException with the stderr output
            raise HTTPException(status_code=400, detail=result.stderr)
        # If the return code is zero, return the stdout output as a JSON response
        return {"output": result.stdout}
    except Exception as e:
        # If any exception occurs, raise an HTTPException with the exception message
        raise HTTPException(status_code=500, detail=str(e))
