import os

from django.core.management import call_command
from django.core.management.base import BaseCommand, CommandError

from db_management.routines import DBBackup


class Command(BaseCommand):
    help = 'Backs up DB to an encrypted JSON file.'

    def handle(self, *args, **options):
        d = DBBackup()
        d.do()
        self.stdout.write(self.style.SUCCESS('Database has been backed up.'))
