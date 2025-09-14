class Matrix:
    
    def __init__(self, matrix_string):
        lines = matrix_string.splitlines()
        self.matrix = []
        self._num_cols = 0
        
        for line in lines:
            if line.strip():
                row = [int(x) for x in line.split()]
                self.matrix.append(row)
                if not self._num_cols:
                    self._num_cols = len(row)

    def row(self, index): 
        return self.matrix[index-1]

    def column(self, index):
        col_idx = index - 1
        return [row[col_idx] for row in self.matrix]