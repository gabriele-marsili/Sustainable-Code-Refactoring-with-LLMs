class School:
    def __init__(self):
        self.students = {}

    def add_student(self, name, grade):
        if grade not in self.students:
            self.students[grade] = []
        self.students[grade].append(name)
        self.students[grade].sort()
   
    def roster(self):
        result = []
        for grade_number in range(1, 8):
            result.extend(self.students.get(grade_number, []))
        return result

    def grade(self, grade_number): 
        return self.students.get(grade_number, []).copy()