#!/bin/bash

# Change to the directory where your Alembic configuration file is located
cd /home/florian/documents/tournament_project/roadplay

# Generate a new migration using Alembic
alembic revision --autogenerate -m "Add new table"

# Optionally, you can run the migration to update the database
alembic upgrade head