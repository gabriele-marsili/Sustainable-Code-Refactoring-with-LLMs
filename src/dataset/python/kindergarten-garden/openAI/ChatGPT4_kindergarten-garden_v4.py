plant = {'V': 'Violets', 'R': 'Radishes', 'G': 'Grass', 'C': 'Clover'}
stu = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Fred', 'Ginny', 'Harriet', 'Ileana', 'Joseph', 'Kincaid', 'Larry']

class Garden:
    def __init__(self, diagram, students=stu):
        self.diagram = diagram.split('\n')
        self.students = sorted(students)
        self.student_indices = {student: i * 2 for i, student in enumerate(self.students)}

    def plants(self, studentx):
        si = self.student_indices[studentx]
        return [plant[p] for row in self.diagram for p in row[si:si + 2]]