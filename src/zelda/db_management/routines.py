import os
from datetime import datetime
from shutil import copyfileobj

from django.core import management
from django.conf import settings

from .utils import encrypt_file, unencrypt_file, compress_file, uncompress_file


class DBBackup(object):
    def do(self):
        now = datetime.now()
        self.remove_old_backups(now)
        file_name = f"{now.strftime(settings.DBBACKUP_DATE_FORMAT)}.json"
        file_path = os.path.join(
            settings.DBBACKUP_DIR,
            file_name,
        )
        management.call_command('dumpdata', '--all', f'--output={file_path}')
        encrypt_file(
            open(file_path, "rb"),
            os.path.join(settings.DBBACKUP_DIR, file_name)
        )

        if os.path.exists(file_path):
            os.remove(file_path)

    def remove_old_backups(self, now):
        backup_dir = settings.DBBACKUP_DIR

        for backup in os.listdir(backup_dir):
            time, _, _ = backup.split(".")
            if now - settings.ARCHIVE_DELTA > datetime.strptime(time, settings.DBBACKUP_DATE_FORMAT):
                os.remove(os.path.join(backup_dir, backup))
