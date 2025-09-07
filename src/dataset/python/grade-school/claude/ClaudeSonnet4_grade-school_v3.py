import pandas as pd

class School:
    def __init__(self):
        self.students = []

    def add_student(self, name, grade):
        self.students.append({'Name': name, 'Grade': grade})
   
    def roster(self):
        if not self.students:
            return []
        
        grade_dict = {}
        for student in self.students:
            grade = student['Grade']
            if 1 <= grade <= 7:
                if grade not in grade_dict:
                    grade_dict[grade] = []
                grade_dict[grade].append(student['Name'])
        
        for grade in grade_dict:
            grade_dict[grade].sort()
        
        result = []
        for grade in range(1, 8):
            if grade in grade_dict:
                result.extend(grade_dict[grade])
        
        return result

    def grade(self, grade_number): 
        if not self.students:
            return []
        
        names = [student['Name'] for student in self.students if student['Grade'] == grade_number]
        return sorted(names)