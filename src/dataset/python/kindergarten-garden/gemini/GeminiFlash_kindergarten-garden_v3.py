plant = {'V':'Violets', 'R':'Radishes', 'G':'Grass', 'C':'Clover'}
stu = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Fred', 'Ginny', 'Harriet', 'Ileana', 'Joseph', 'Kincaid', 'Larry']
class Garden: 
    def __init__(self, diagram, students=stu):
        self.diagram = diagram
        self.students = sorted(students)
    def plants(self, studentx):
        try:
            si = self.students.index(studentx) * 2
        except ValueError:
            return []
        rows = self.diagram.split('\n')
        stu_plants = [row[si:si+2] for row in rows]
        return [plant[p] for sp in stu_plants for p in sp]