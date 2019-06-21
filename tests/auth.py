import os
import random
import argparse
import logging
from xmlrpc.server import SimpleXMLRPCServer


class AuthCredentialsXMLRPCServer:
    def __init__(self, port, student_auth_file, prof_auth_file, host="127.0.0.1"):
        self.logger = logging.getLogger("auth.server")
        self.server = SimpleXMLRPCServer((host, port), allow_none=True)

        self.student_creds = self._load_creds(student_auth_file)
        self.professor_creds = self._load_creds(prof_auth_file)

        self.server.register_function(
            self.get_prof_credentials,
            "get_prof_credentials",
        )
        self.server.register_function(
            self.get_student_credentials,
            "get_student_credentials",
        )

    def get_prof_credentials(self):
        return self.professor_creds[random.choice(range(0, len(self.professor_creds)))]

    def get_student_credentials(self):
        return self.student_creds.pop()

    def _load_creds(self, auth_file):
        assert os.path.isfile(auth_file)
        creds = list()

        with open(auth_file) as fr:
            for line in fr:
                creds.append(line.rstrip("\n").split("\t"))
        random.shuffle(creds)

        return creds

    def start(self):
        try:
            logging.info("Serving requests now")
            self.server.serve_forever()
        except KeyboardInterrupt:
            logging.info('Keyboard interrupt received: stopping server')
        finally:
            self.server.server_close()


def _handle_command_line():
    description = "XML-RPC Server to provide auth credentials during test load testing"
    parser = argparse.ArgumentParser(description=description)
    parser.add_argument(
        "--host",
        metavar="host",
        type=str,
        help="bind server to specified address",
        default="127.0.0.1",
    )
    parser.add_argument(
        "port",
        metavar="port",
        type=int,
        help="listen on the specified port",
    )
    parser.add_argument(
        "student_auth_file",
        metavar="student_auth_file",
        type=str,
        help=".txt containing student credentials",
    )
    parser.add_argument(
        "prof_auth_file",
        metavar="prof_auth_file",
        type=str,
        help=".txt containing professor credentials",
    )
    args = parser.parse_args()
    return args


def main():
    args = _handle_command_line()
    logging.basicConfig(
        level = logging.DEBUG,
        format = '%(levelname)s:%(message)s',
    )
    server = AuthCredentialsXMLRPCServer(
        args.port,
        args.student_auth_file,
        args.prof_auth_file,
        args.host,
    )
    server.start()


if __name__ == "__main__":
    main()
