class Matrix:
    
    def __init__(self, matrix_string):
        self.matrix = [[int(i) for i in e.split()] for e in matrix_string.splitlines()] 

    def row(self, index): 
        return self.matrix[index-1]

    def column(self, index):
        return [e[index - 1] for e in self.matrix] 
