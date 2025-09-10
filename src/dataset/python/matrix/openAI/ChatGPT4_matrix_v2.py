class Matrix:
    
    def __init__(self, matrix_string):
        self.matrix = [list(map(int, e.split())) for e in matrix_string.splitlines()]

    def row(self, index): 
        return self.matrix[index - 1]

    def column(self, index):
        col_index = index - 1
        return [row[col_index] for row in self.matrix]