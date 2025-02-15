import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
SECRET_KEY = os.getenv("SECRET_KEY")
SSL_CERT_PATH = os.getenv("SSL_CERT_PATH")
ALGORITHM = os.getenv("HASHING_ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 #set to 24 hours