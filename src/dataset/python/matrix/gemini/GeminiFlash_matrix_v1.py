class Matrix:
    def __init__(self, matrix_string):
        self.rows = [[int(num) for num in row.split()] for row in matrix_string.splitlines()]
        self.cols = list(zip(*self.rows))

    def row(self, index):
        return self.rows[index - 1]

    def column(self, index):
        return list(self.cols[index - 1])