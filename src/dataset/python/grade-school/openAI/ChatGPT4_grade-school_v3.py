import pandas as pd
from collections import defaultdict

class School:
    def __init__(self):
        self.students = defaultdict(list)

    def add_student(self, name, grade):
        self.students[grade].append(name)

    def roster(self):
        return [student for grade in range(1, 8) for student in self.grade(grade)]

    def grade(self, grade_number):
        return sorted(self.students.get(grade_number, []))