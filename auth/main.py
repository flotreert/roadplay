import fastapi
from fastapi.middleware.cors import CORSMiddleware

from auth import router as auth_lib
from auth.user import router as auth_user

app = fastapi.FastAPI(title='Auth')
app.include_router(auth_lib.router, tags=['auth'])
app.include_router(auth_user.router, tags=['user'])

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

