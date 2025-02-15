from sqlmodel import create_engine, Session, select
from sqlalchemy.orm import sessionmaker
from database.seed_data import get_default_leads
from lead.model import Lead

from config import DATABASE_URL, SSL_CERT_PATH

engine = create_engine(DATABASE_URL, echo=True, connect_args={"sslmode": "require", "sslrootcert": SSL_CERT_PATH }, pool_pre_ping=True,
pool_size=10, max_overflow=20 )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_session():
    with Session(engine) as session:
        yield session

def seed_db():
    with Session(engine) as session:
        data = session.exec(select(Lead)).first()
        if not data:
            default_leads = get_default_leads()
            session.add_all(default_leads)
            session.commit()
            print("Lead Database seeded successfully")
        else:
            print("Lead Database already seeded with data")

def close_db():
    if engine:
        engine.dispose()
        print("Database connection closed.")