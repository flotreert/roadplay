FROM python:3.12.3-slim-bullseye 

WORKDIR /app

COPY auth/requirements.txt requirements.txt
RUN python3.11 -m pip install -r requirements.txt

COPY /auth .


CMD ["uvicorn", "auth.main:app", "--reload", "--port", "8101"]
# CMD ["uvicorn", "auth.main:app", "--port", "8101"]
