import fastapi
from fastapi.middleware.cors import CORSMiddleware

from auth import router as auth_lib

app = fastapi.FastAPI()
app.include_router(auth_lib.router)

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

