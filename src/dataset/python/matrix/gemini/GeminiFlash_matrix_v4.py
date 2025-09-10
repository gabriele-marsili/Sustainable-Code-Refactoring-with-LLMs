class Matrix:
    
    def __init__(self, matrix_string):
        self.matrix = []
        for row_string in matrix_string.splitlines():
            self.matrix.append(list(map(int, row_string.split())))

    def row(self, index): 
        return self.matrix[index-1]

    def column(self, index):
        return [row[index - 1] for row in self.matrix]