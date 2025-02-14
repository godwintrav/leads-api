import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
SECRET_KEY = os.getenv("SECRET_KEY")
SSL_CERT_PATH = os.getenv("SSL_CERT_PATH")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30