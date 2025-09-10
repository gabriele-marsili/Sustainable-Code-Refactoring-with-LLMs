plant = {'V':'Violets', 'R':'Radishes', 'G':'Grass', 'C':'Clover'}
stu = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Fred', 'Ginny', 'Harriet', 'Ileana', 'Joseph', 'Kincaid', 'Larry']
class Garden: 
    def __init__(self, diagram, students=stu):
        self.diagram = diagram
        self.students = sorted(students)
        self.student_index = {student: i for i, student in enumerate(self.students)}

    def plants(self, studentx):
        try:
            si = self.student_index[studentx] * 2
        except KeyError:
            return []

        rows = self.diagram.split('\n')
        stu_plants = [row[si:si+2] for row in rows]
        
        plants_list = []
        for sp in stu_plants:
            plants_list.extend([plant[p] for p in sp])
        return plants_list