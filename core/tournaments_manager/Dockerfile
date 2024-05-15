FROM python:3.11.3-slim-bullseye 

WORKDIR /app

COPY requirements.txt requirements.txt
RUN python3.11 -m pip install -r requirements.txt

COPY ./ .


CMD ["uvicorn", "core.tournaments_manager.app:app", "--reload", "--port", "8100"]
# CMD ["uvicorn", "core.tournaments_manager.app:app", "--port", "8100"]

