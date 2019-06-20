import os
import tempfile
from getpass import getpass
from shutil import copyfileobj
import gzip
import random

import gnupg
from django.conf import settings
from django.db import IntegrityError
from faker import Faker
import pyprind

from users import models as user_models
from courses.models import Course, Subject


"""
The following code was adapted from https://github.com/django-dbbackup/django-dbbackup/blob/master/dbbackup/utils.py
on commit 3669928ad97021a7c88435aa4a0d1cf5b4e1223b

"""

TEMP_DIR = tempfile.gettempdir()


class EncryptionError(Exception):
    pass


class DecryptionError(Exception):
    pass


def create_spooled_temporary_file(filepath=None, fileobj=None):
    """
    Create a spooled temporary file. if ``filepath`` or ``fileobj`` is
    defined its content will be copied into temporary file.
    :param filepath: Path of input file
    :type filepath: str
    :param fileobj: Input file object
    :type fileobj: file
    :returns: Spooled temporary file
    :rtype: :class:`tempfile.SpooledTemporaryFile`
    """
    spooled_file = tempfile.SpooledTemporaryFile(
        max_size=settings.TMP_FILE_MAX_SIZE,
        dir=TEMP_DIR)
    if filepath:
        fileobj = open(filepath, 'r+b')
    if fileobj is not None:
        fileobj.seek(0)
        copyfileobj(fileobj, spooled_file, settings.TMP_FILE_MAX_SIZE)
    return spooled_file


def encrypt_file(inputfile, out_filename):
    """
    Encrypt input file using GPG and remove .gpg extension to its name.
    :param inputfile: File to encrypt
    :type inputfile: ``file`` like object
    :param filename: File's name
    :type filename: ``str``
    """

    out_filename = '%s.gpg' % out_filename
    inputfile.seek(0)
    always_trust = settings.GPG_ALWAYS_TRUST
    g = gnupg.GPG()
    with open(settings.GPG_KEY_PATH) as fr:
        key = fr.read()
    g.import_keys(key)
    result = g.encrypt_file(inputfile, output=out_filename,
                            recipients=[settings.GPG_RECIPIENT],
                            always_trust=always_trust)
    inputfile.close()
    if not result:
        msg = 'Encryption failed; status: %s' % result.status
        raise EncryptionError(msg)


def unencrypt_file(inputfile, out_filename, passphrase=None):
    """
    Unencrypt input file using GPG and remove .gpg extension to its name.
    :param inputfile: File to encrypt
    :type inputfile: ``file`` like object
    :param filename: File's name
    :type filename: ``str``
    :param passphrase: Passphrase of GPG key, if equivalent to False, it will
                       be asked to user. If user answer an empty pass, no
                       passphrase will be used.
    :type passphrase: ``str`` or ``None``
    """

    def get_passphrase(passphrase=passphrase):
        return passphrase or getpass('Input Passphrase: ') or None


    inputfile.seek(0)
    g = gnupg.GPG()
    assert os.path.exists(settings.GPG_KEY_PATH)
    with open(settings.GPG_KEY_PATH) as fr:
        key = fr.read()
    g.import_keys(key)
    result = g.decrypt_file(file=inputfile, passphrase=get_passphrase(),
                            output=out_filename)
    if not result:
        raise DecryptionError('Decryption failed; status: %s' % result.status)



def compress_file(inputfile, filename):
    """
    Compress input file using gzip and change its name.
    :param inputfile: File to compress
    :type inputfile: ``file`` like object
    :param filename: File's name
    :type filename: ``str``
    :returns: Tuple with compressed file and new file's name
    :rtype: :class:`tempfile.SpooledTemporaryFile`, ``str``
    """
    outputfile = create_spooled_temporary_file()
    new_filename = filename + '.gz'
    zipfile = gzip.GzipFile(filename=filename, fileobj=outputfile, mode="wb")
    try:
        inputfile.seek(0)
        copyfileobj(inputfile, zipfile, settings.TMP_FILE_MAX_SIZE)
    finally:
        zipfile.close()
    return outputfile, new_filename


def uncompress_file(inputfile, filename):
    """
    Uncompress this file using gzip and change its name.
    :param inputfile: File to compress
    :type inputfile: ``file`` like object
    :param filename: File's name
    :type filename: ``str``
    :returns: Tuple with file and new file's name
    :rtype: :class:`tempfile.SpooledTemporaryFile`, ``str``
    """
    zipfile = gzip.GzipFile(fileobj=inputfile, mode="rb")
    try:
        outputfile = create_spooled_temporary_file(fileobj=zipfile)
    finally:
        zipfile.close()
    new_basename = os.path.basename(filename).replace('.gz', '')
    return outputfile, new_basename


def generate_fake_appuser(user_type, fake):
    institutional_email = fake.email(domain="ulisboa.pt")
    password = fake.password(length=16)
    return institutional_email, password, user_models.AppUser.objects.create_user(
        fake.profile(fields=["username"])["username"],
        password=password,
        first_name=fake.first_name(),
        last_name=fake.last_name(),
        email=fake.email(),
        user_type=user_type,
        institutional_email=institutional_email,
        country="PT",
    )


def generate_fake_students(n, course_id, subject_id, auth_file):
    i = 0
    fake = Faker()
    student_number = max(map(lambda s: s.number, user_models.Student.objects.all())) + 1
    course = Course.objects.get(id=course_id)
    bar = pyprind.ProgBar(n, bar_char='█', title='Generating fake students')
    subject = Subject.objects.get(id=subject_id)

    with open(auth_file, "w") as fw:
        while i < n:
            try:
                institutional_email, password, app_user = generate_fake_appuser("Student", fake)
                app_user.save()

                student = user_models.Student(
                    app_user=app_user,
                    number=student_number,
                    call=random.choice(["1", "2"]),
                    entry_grade=random.randrange(0, 200, 1),
                )
                student.save()
                student.course.add(course)
                student.save()
                subject.students.add(student)
                subject.save()

                fw.write(f"{institutional_email}\t{password}\n")

                i += 1
                student_number += 1
                bar.update()
            except IntegrityError:
                pass
