# Leads App API Backend

## Project Overview

This is the Leads app backend API. This project uses Fastapi and Postgresql. The main entry file is the main.py file. The project uses a modular architecture to ensure seperation of concern. Each module handles various parts of the whole application. The src module store the core api domains which is Auth and Lead.

The database module holds the functions for setting up our database and the migration module stores the Alembic configuration for running migrations.

### Features

- Authentication and Authorization 
- Query and Filter Lead Data with efficient and optimised queries and proper pagination
- Export Lead data to csv
- Creating, Update and Delete Lead

### Deployment

The application is deployed on render: [https://leads-api-h40k.onrender.com](https://leads-api-h40k.onrender.com)

- API endpoint: [https://leads-api-h40k.onrender.com](https://leads-api-h40k.onrender.com)
- Interactive API Docs (Swagger UI): [https://leads-api-h40k.onrender.com/docs](https://leads-api-h40k.onrender.com/docs)
- Alternative API Docs (ReDoc): [https://leads-api-h40k.onrender.com/redoc](https://leads-api-h40k.onrender.com/redoc)

##  API Modules:

### Auth Module

The Auth Module is the module stores the routes, models, schemas and utility functions  that handles the authentication for the backend for ensuring maximum authentication and authorization before being able to access other routes on our app.


### Lead Module

This module stores the routes, models, schema and services for handling all features for storing, retrieving and updating Lead information

## Fast API Project Setup Guide

This guide provides step-by-step instructions on setting up the fast api backend.

## Prerequisites

Ensure you have the following installed:
- Python 3.8+
- pip (Python package manager)
- virtualenv (optional but recommended)

## Installation

### 1. Create and Activate a Virtual Environment

#### On macOS/Linux:
```bash
python3 -m venv venv
source venv/bin/activate
```

#### On Windows:
```bash
python -m venv venv
venv\Scripts\activate
```

### 2. Install requirements

```bash
pip install -r requirements.txt
```

### 3. Set environment variables

set environment variables required to get app running. Check env.example for required environment variables

### 4. Setup Database

Run the command below to run migration script:
```bash
alembic upgrade head
```

### 5. Run the FastAPI Server

```bash
uvicorn main:app --port 8000 --reload
```

- `--port 8000` runs the server on port 8000.
- `--reload` enables auto-reloading on code changes.

### 6. Test the API

Open your browser and go to:

- API endpoint: [http://127.0.0.1:8000](http://127.0.0.1:8000)
- Interactive API Docs (Swagger UI): [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- Alternative API Docs (ReDoc): [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)


