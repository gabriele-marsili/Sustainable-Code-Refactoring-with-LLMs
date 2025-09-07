import pandas as pd

class School:
    def __init__(self):
        self.students = pd.DataFrame(columns=['Name', 'Grade'])

    def add_student(self, name, grade):
        new_student = pd.DataFrame({'Name': [name], 'Grade': [grade]})
        self.students = pd.concat([self.students, new_student], ignore_index=True)

    def roster(self):
        if self.students.empty:
            return []
        else:
            all_students = []
            for grade_number in range(1, 8):
                all_students.extend(self.grade(grade_number))
            return all_students

    def grade(self, grade_number):
        if self.students.empty:
            return []
        else:
            grade_df = self.students[self.students['Grade'] == grade_number]
            return sorted(grade_df['Name'].tolist())