import uvicorn
from fastapi import FastAPI

from core.tournaments_manager import app

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)