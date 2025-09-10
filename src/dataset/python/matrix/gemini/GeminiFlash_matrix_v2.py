class Matrix:
    def __init__(self, matrix_string):
        self.rows = []
        for row_string in matrix_string.splitlines():
            self.rows.append([int(x) for x in row_string.split()])

    def row(self, index):
        return self.rows[index - 1]

    def column(self, index):
        return [row[index - 1] for row in self.rows]