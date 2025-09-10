import random
import string

RobotLibrary = set()

class Robot:

    def __init__(self):
        self.name = self._generate_unique_name()
   
    def _generate_unique_name(self):
        while True:
            name = ''.join(random.choices(string.ascii_uppercase, k=2) + random.choices(string.digits, k=3))
            if name not in RobotLibrary:
                RobotLibrary.add(name)
                return name
   
    def reset(self):
        self.name = self._generate_unique_name()