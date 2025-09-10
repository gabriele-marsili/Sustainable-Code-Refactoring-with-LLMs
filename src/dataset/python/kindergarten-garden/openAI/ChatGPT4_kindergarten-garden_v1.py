plant = {'V': 'Violets', 'R': 'Radishes', 'G': 'Grass', 'C': 'Clover'}
stu = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Fred', 'Ginny', 'Harriet', 'Ileana', 'Joseph', 'Kincaid', 'Larry']

class Garden:
    def __init__(self, diagram, students=stu):
        self.diagram = diagram.split('\n')
        self.students = sorted(students)

    def plants(self, studentx):
        si = self.students.index(studentx) * 2
        return [plant[p] for row in self.diagram for p in row[si:si+2]]