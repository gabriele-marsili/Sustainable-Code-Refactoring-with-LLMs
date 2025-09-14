class Matrix:
    
    def __init__(self, matrix_string):
        lines = matrix_string.splitlines()
        self.matrix = []
        self._columns = None
        
        for line in lines:
            row = []
            for num_str in line.split():
                row.append(int(num_str))
            self.matrix.append(row)

    def row(self, index): 
        return self.matrix[index-1]

    def column(self, index):
        if self._columns is None:
            self._columns = list(zip(*self.matrix))
        return list(self._columns[index-1])