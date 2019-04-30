import os

from django.core.management import call_command
from django.core.management.base import BaseCommand, CommandError

from db_management.utils import unencrypt_file


class RestoreDB(BaseCommand):
    help = 'Restores database info from encrypted file with GPG'

    def add_arguments(self, parser):
        parser.add_argument('dump_file', nargs=1, type=str)

    def handle(self, *args, **options):
        dump_file = options['dump_file']

        if not os.path.exists(dump_file):
            raise CommandError('The file provided does not exist.')

        gpg_passphrase = os.getenv('GPG_KEY')
        if gpg_passphrase is None:
            raise CommandError('GPG Passphrase not set. Please set gpg passphrase to GPG_KEY env variable.')

        tmp_filename = f"{dump_file.split('.')[0]}.tmp.json"

        unencrypt_file(open(dump_file, 'rb'), tmp_filename, gpg_passphrase)
        call_command('loaddata', tmp_filename)
        os.remove(tmp_filename)

        self.stdout.write(self.style.SUCCESS('Restored database'))
