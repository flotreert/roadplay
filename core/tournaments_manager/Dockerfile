FROM python:3.11.3-slim-bullseye 
RUN alias python3.11=python3
RUN alias python3=python

WORKDIR /app

COPY core/tournaments_manager /app/tournaments_manager
COPY core/tournaments_manager/requirements.txt requirements.txt
RUN python3 -m pip install -r requirements.txt

COPY common/. /common/.
RUN python3 -m pip install -r /common/requirements.txt

