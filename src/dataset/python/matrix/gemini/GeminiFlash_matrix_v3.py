class Matrix:
    def __init__(self, matrix_string):
        self.rows = []
        for row_string in matrix_string.splitlines():
            self.rows.append([int(num) for num in row_string.split()])

        self.num_rows = len(self.rows)
        self.num_cols = len(self.rows[0]) if self.num_rows > 0 else 0

    def row(self, index):
        return self.rows[index - 1]

    def column(self, index):
        if not (1 <= index <= self.num_cols):
            raise IndexError("Column index out of bounds")

        return [self.rows[i][index - 1] for i in range(self.num_rows)]