def set_matrix_zeroes(matrix):
    n = len(matrix)
    if n == 0:
        return
    m = len(matrix[0])

    is_row = any(matrix[0][j] == 0 for j in range(m))
    is_col = any(matrix[i][0] == 0 for i in range(n))

    for i in range(1, n):
        for j in range(1, m):
            if matrix[i][j] == 0:
                matrix[i][0] = matrix[0][j] = 0

    for i in range(1, n):
        for j in range(1, m):
            if matrix[i][0] == 0 or matrix[0][j] == 0:
                matrix[i][j] = 0

    if is_row:
        matrix[0] = [0] * m
    if is_col:
        for i in range(n):
            matrix[i][0] = 0