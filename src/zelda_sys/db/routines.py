import os
from datetime import datetime

from django.core import management
from django.conf import settings
from django_cron import CronJobBase, Schedule


class DBBackup(CronJobBase):
    RUN_AT_TIMES = settings.BACKUP_TIMES
    schedule = Schedule(run_at_times=RUN_AT_TIMES)
    code = 'db.DBBackup'

    def do(self):
        self.remove_old_backups()
        management.call_command('dbbackup', '--encrypt')

    def remove_old_backups(self):
        now = datetime.now()
        backup_dir = settings.BACKUP_DIR

        for backup in os.listdir(backup_dir):
            time, _ = backup.split(".")
            if now - settings.ARCHIVE_DELTA > datetime.strptime(time, settings.DBBACKUP_DATE_FORMAT):
                os.remove(os.path.join(backup_dir, backup))
