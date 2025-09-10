def search_2d_matrix(matrix, target):
    if not matrix or not matrix[0]:
        return False

    i, j = len(matrix) - 1, 0

    while i >= 0 and j < len(matrix[0]):
        value = matrix[i][j]
        if value == target:
            return True
        elif value > target:
            i -= 1
        else:
            j += 1

    return False