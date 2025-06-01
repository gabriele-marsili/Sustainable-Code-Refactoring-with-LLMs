import pandas as pd
class School:
    def __init__(self):
        self.students = pd.DataFrame()

    def add_student(self, name, grade):
        self.students = self.students.append({'Name':name, 'Grade':grade}, ignore_index=True)
   
    def roster(self):
        if self.students.empty:
           return []
        else:
           return [x for y in range(1, 8) for x in self.grade(y)]

    def grade(self, grade_number): 
        if self.students.empty:
           return []
        else:
           return sorted(self.students.loc[self.students['Grade'] == grade_number]['Name'].tolist())
