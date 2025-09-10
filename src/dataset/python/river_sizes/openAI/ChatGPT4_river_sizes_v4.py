def river_sizes(matrix):
    n = len(matrix)
    m = len(matrix[0])
    results = []
    directions = [(-1, 0), (0, -1), (1, 0), (0, 1)]

    def dfs(i, j):
        stack = [(i, j)]
        size = 0
        while stack:
            x, y = stack.pop()
            if 0 <= x < n and 0 <= y < m and matrix[x][y] == 1:
                matrix[x][y] = 0
                size += 1
                stack.extend((x + dx, y + dy) for dx, dy in directions)
        return size

    for i in range(n):
        for j in range(m):
            if matrix[i][j] == 1:
                results.append(dfs(i, j))

    return results