import random
import string

_used_names = set()

class Robot:
    def __init__(self):
        self.name = self._generate_name()

    def _generate_name(self):
        while True:
            name = ''.join(random.choices(string.ascii_uppercase, k=2) + random.choices(string.digits, k=3))
            if name not in _used_names:
                _used_names.add(name)
                return name

    def reset(self):
        self.name = self._generate_name()