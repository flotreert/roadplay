FROM python:3.11.3-slim-bullseye 

WORKDIR /app

COPY requirements.txt requirements.txt
RUN python3.11 -m pip install -r requirements.txt

COPY ./ .


CMD ["uvicorn", "auth.main:app", "--reload", "--port", "8101"]
# CMD ["uvicorn", "auth.main:app", "--port", "8101"]
