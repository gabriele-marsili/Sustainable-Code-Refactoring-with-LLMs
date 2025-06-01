import random
import string

RobotLibrary = set()

class Robot:

    def __init__(self):
        self.name = self.generate_name()
   
    def generate_name(self):
        letters = random.choices(string.ascii_uppercase, k=2)
        numbers = random.choices(string.digits, k=3)
        name = ''.join(letters + numbers)
        if name not in RobotLibrary:    
           RobotLibrary.add(name)
           return name
   
    def reset(self):
        self.name = self.generate_name()
