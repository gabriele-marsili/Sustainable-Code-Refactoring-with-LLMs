import random
import string

_robot_names = set()

class Robot:

    def __init__(self):
        self.name = self._generate_name()

    def _generate_name(self):
        while True:
            name = ''.join(random.choices(string.ascii_uppercase, k=2) + random.choices(string.digits, k=3))
            if name not in _robot_names:
                _robot_names.add(name)
                return name

    def reset(self):
        self.name = self._generate_name()