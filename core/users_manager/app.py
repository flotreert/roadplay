import fastapi
from fastapi.middleware.cors import CORSMiddleware

from core.users_manager import crud as users_db
from core.users_manager import model as users_model

app = fastapi.FastAPI()


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


@app.get('/')
def read_root():
    return {'message': 'Welcome to the Users Manager API!'}

@app.get('/users')
def get_users() -> list[users_model.User]:
    return users_db.get_users()

@app.get('/users/{user_id}')
def get_user(user_id: int) -> users_model.User:
    return users_db.get_user(user_id)

@app.post('/users')
def create_user(schema: users_model.UserCreate):
    users_db.add_user(schema)
    return {'message': 'User created!'}

@app.put('/users/{user_id}')
def update_user(user_id: int, schema: users_model.UserBase):
    users_db.update_user(user_id, schema)
    return {'message': 'User updated successfully!'}

@app.delete('/users/{user_id}')
def delete_user(user_id: int):
    users_db.delete_user(user_id)
    return {'message': 'User deleted!'}

@app.get('/users/{username}')
def get_user_by_username(username: str) -> users_model.User:
    return users_db.get_user_by_username(username)


