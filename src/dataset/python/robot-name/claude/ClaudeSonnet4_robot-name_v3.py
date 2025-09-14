import random
import string

RobotLibrary = set()

class Robot:
    _letters = string.ascii_uppercase
    _digits = string.digits

    def __init__(self):
        self.name = self.generate_name()
   
    def generate_name(self):
        while True:
            letters = random.choices(self._letters, k=2)
            numbers = random.choices(self._digits, k=3)
            name = ''.join(letters + numbers)
            if name not in RobotLibrary:    
                RobotLibrary.add(name)
                return name
   
    def reset(self):
        self.name = self.generate_name()