import random
import string

_used_names = set()

class Robot:
    _name_length = 5
    _letters_count = 2
    _numbers_count = 3
    _max_attempts = 1000

    def __init__(self):
        self.name = self._generate_name()

    def _generate_name(self):
        for _ in range(self._max_attempts):
            name = ''.join(random.choices(string.ascii_uppercase, k=self._letters_count) +
                           random.choices(string.digits, k=self._numbers_count))
            if name not in _used_names:
                _used_names.add(name)
                return name
        raise RuntimeError("Failed to generate a unique name after multiple attempts.")

    def reset(self):
        old_name = self.name
        self.name = self._generate_name()
        if old_name in _used_names:
            _used_names.remove(old_name)