def spiral_matrix(matrix):
    if not matrix or not matrix[0]:
        return []

    res = []
    top, bottom, left, right = 0, len(matrix) - 1, 0, len(matrix[0]) - 1

    while top <= bottom and left <= right:
        for y in range(left, right + 1):
            res.append(matrix[top][y])
        top += 1

        for x in range(top, bottom + 1):
            res.append(matrix[x][right])
        right -= 1

        if top <= bottom:
            for y in range(right, left - 1, -1):
                res.append(matrix[bottom][y])
            bottom -= 1

        if left <= right:
            for x in range(bottom, top - 1, -1):
                res.append(matrix[x][left])
            left += 1

    return res