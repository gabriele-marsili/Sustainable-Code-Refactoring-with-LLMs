def river_sizes(matrix):
    n = len(matrix)
    m = len(matrix[0])
    results = []

    def dfs(i, j):
        stack = [(i, j)]
        size = 0
        while stack:
            x, y = stack.pop()
            if 0 <= x < n and 0 <= y < m and matrix[x][y] == 1:
                matrix[x][y] = 0  # Mark as visited
                size += 1
                # Add neighbors directly to the stack
                stack.extend([(x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)])
        return size

    for i in range(n):
        for j in range(m):
            if matrix[i][j] == 1:
                results.append(dfs(i, j))

    return results