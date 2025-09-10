def search_2d_matrix(matrix, target):
    i, j = len(matrix) - 1, 0

    while i >= 0 and j < len(matrix[0]):
        value = matrix[i][j]
        if value == target:
            return True
        i, j = (i - 1, j) if value > target else (i, j + 1)

    return False