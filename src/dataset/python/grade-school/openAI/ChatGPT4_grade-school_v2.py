import pandas as pd

class School:
    def __init__(self):
        self.students = []

    def add_student(self, name, grade):
        self.students.append({'Name': name, 'Grade': grade})

    def roster(self):
        return [student['Name'] for grade in range(1, 8) for student in sorted(self.students, key=lambda x: x['Name']) if student['Grade'] == grade]

    def grade(self, grade_number):
        return sorted(student['Name'] for student in self.students if student['Grade'] == grade_number)