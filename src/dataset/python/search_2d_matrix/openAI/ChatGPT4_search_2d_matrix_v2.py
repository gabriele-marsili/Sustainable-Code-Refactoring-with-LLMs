def search_2d_matrix(matrix, target):
    if not matrix or not matrix[0]:
        return False

    i, j = len(matrix) - 1, 0

    while i >= 0 and j < len(matrix[0]):
        current = matrix[i][j]
        if current == target:
            return True
        elif current > target:
            i -= 1
        else:
            j += 1

    return False