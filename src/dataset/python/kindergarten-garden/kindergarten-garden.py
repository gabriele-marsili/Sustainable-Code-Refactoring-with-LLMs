plant = {'V':'Violets', 'R':'Radishes', 'G':'Grass', 'C':'Clover'}
stu = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Fred', 'Ginny', 'Harriet', 'Ileana', 'Joseph', 'Kincaid', 'Larry']
class Garden: 
    def __init__(self, diagram, students=stu):
        self.diagram = diagram
        self.students = students
    def plants(self, studentx):
          si = 0
          for order, student in enumerate(sorted(self.students)):
              if student in studentx:
                 si = order*2
          rows = self.diagram.split('\n') 
          stu_plants = [c[si:si+2] for c in rows]
          return [plant[p] for sp in stu_plants for p in sp]
    
