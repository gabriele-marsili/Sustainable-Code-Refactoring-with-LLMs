import pandas as pd

class School:
    def __init__(self):
        self.students = []

    def add_student(self, name, grade):
        self.students.append((name, grade))

    def roster(self):
        return [name for grade in range(1, 8) for name in self.grade(grade)]

    def grade(self, grade_number):
        return sorted(name for name, grade in self.students if grade == grade_number)