class Matrix:
    __slots__ = ('_matrix',)

    def __init__(self, matrix_string):
        self._matrix = tuple(tuple(map(int, row.split())) for row in matrix_string.splitlines())

    def row(self, index):
        return self._matrix[index - 1]

    def column(self, index):
        return tuple(row[index - 1] for row in self._matrix)