import os
import tempfile
from getpass import getpass
from shutil import copyfileobj
import gzip

import gnupg
from django.conf import settings


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
