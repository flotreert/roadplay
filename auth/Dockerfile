FROM python:3.11.3-slim-bullseye 
RUN alias python3.11=python3
RUN alias python3=python
RUN python -m pip install python-multipart
RUN pip install python-multipart
WORKDIR /app
COPY auth/requirements.txt requirements.txt
RUN pip install -r requirements.txt
RUN python -m pip install -r requirements.txt
COPY auth /app/auth

COPY common/ /common
RUN python -m pip install -r /common/requirements.txt

