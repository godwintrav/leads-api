from sqlmodel import create_engine, Session, SQLModel

from config import DATABASE_URL, SSL_CERT_PATH

engine = create_engine(DATABASE_URL, echo=True, connect_args={"sslmode": "require", "sslrootcert": SSL_CERT_PATH })

def init_db():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session