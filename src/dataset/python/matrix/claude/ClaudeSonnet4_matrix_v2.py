class Matrix:
    
    def __init__(self, matrix_string):
        self.matrix = tuple(tuple(int(i) for i in line.split()) for line in matrix_string.splitlines())

    def row(self, index): 
        return self.matrix[index-1]

    def column(self, index):
        col_idx = index - 1
        return tuple(row[col_idx] for row in self.matrix)