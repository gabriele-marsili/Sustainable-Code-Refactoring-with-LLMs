plant = {'V':'Violets', 'R':'Radishes', 'G':'Grass', 'C':'Clover'}
stu = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Fred', 'Ginny', 'Harriet', 'Ileana', 'Joseph', 'Kincaid', 'Larry']

class Garden: 
    def __init__(self, diagram, students=stu):
        self.rows = diagram.split('\n')
        self.student_index = {student: i * 2 for i, student in enumerate(sorted(students))}
    
    def plants(self, studentx):
        si = self.student_index[studentx]
        return [plant[p] for row in self.rows for p in row[si:si+2]]