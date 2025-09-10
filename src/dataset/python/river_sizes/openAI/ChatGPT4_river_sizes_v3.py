def river_sizes(matrix):
    n = len(matrix)
    m = len(matrix[0])
    results = []

    def dfs(i, j):
        if i < 0 or j < 0 or i >= n or j >= m or matrix[i][j] == 0:
            return 0
        matrix[i][j] = 0
        size = 1
        for x, y in ((-1, 0), (0, -1), (1, 0), (0, 1)):
            size += dfs(i + x, j + y)
        return size

    for i in range(n):
        for j in range(m):
            if matrix[i][j] == 1:
                results.append(dfs(i, j))

    return results