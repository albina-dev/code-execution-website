from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import subprocess

app = FastAPI()

class CodeSubmission(BaseModel):
    code: str

@app.post("/api/test-code")
def test_code(submission: CodeSubmission):
    try:
        result = subprocess.run(
            ["python3", "-c", submission.code],
            capture_output=True,
            text=True,
            timeout=5,
        )
        if result.returncode != 0:
            raise HTTPException(status_code=400, detail=result.stderr)
        return {"output": result.stdout}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
