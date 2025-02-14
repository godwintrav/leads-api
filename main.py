from fastapi import FastAPI

app = FastAPI()

@app.get('/health')
def index():
    return {"message": "Running"}