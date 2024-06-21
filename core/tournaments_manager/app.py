"""Main app for the tournaments manager"""
import fastapi
from fastapi.middleware.cors import CORSMiddleware

from core.tournaments_manager.tournaments import router as tournaments
from core.tournaments_manager.participants import router as participants



app = fastapi.FastAPI(
    title='Tournament Manager API',
    prefix='/api/tournaments',
    root_path='/api/tournaments',
)

app.include_router(tournaments.router, tags=['tournaments'])
app.include_router(participants.router, tags=['participants'])

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
