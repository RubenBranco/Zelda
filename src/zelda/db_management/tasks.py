from zelda.celery import app
from .routines import DBBackup


@app.task
def backup_db_task():
    DBBackup().do()
