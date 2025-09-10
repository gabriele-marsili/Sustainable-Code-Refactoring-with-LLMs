plant = {'V':'Violets', 'R':'Radishes', 'G':'Grass', 'C':'Clover'}
stu = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Fred', 'Ginny', 'Harriet', 'Ileana', 'Joseph', 'Kincaid', 'Larry']
class Garden: 
    def __init__(self, diagram, students=stu):
        self.diagram = diagram
        self.students = sorted(students)
        self.plant_rows = diagram.split('\n')

    def plants(self, studentx):
        try:
            si = self.students.index(studentx) * 2
        except ValueError:
            return []

        stu_plants = [row[si:si+2] for row in self.plant_rows]
        return [plant[p] for row in stu_plants for p in row]