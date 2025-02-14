from sqlmodel import create_engine, Session, SQLModel

from config import DATABASE_URL, SSL_CERT_PATH

engine = create_engine(DATABASE_URL, echo=True, connect_args={"sslmode": "require", "sslrootcert": SSL_CERT_PATH }, pool_pre_ping=True,
pool_size=10, max_overflow=20 )

def init_db():
    SQLModel.metadata.create_all(engine)
    print("DB connected")

def get_session():
    with Session(engine) as session:
        yield session

def close_db():
    if engine:
        engine.dispose()
        print("Database connection closed.")