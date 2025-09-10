from collections import deque

def num_of_islands(grid):
    n = len(grid)
    if n == 0:
        return 0
    m = len(grid[0])

    islands = 0
    directions = [(-1, 0), (0, 1), (1, 0), (0, -1)]

    def bfs(x, y):
        queue = deque([(x, y)])
        grid[x][y] = '0'
        while queue:
            cx, cy = queue.popleft()
            for dx, dy in directions:
                nx, ny = cx + dx, cy + dy
                if 0 <= nx < n and 0 <= ny < m and grid[nx][ny] == '1':
                    grid[nx][ny] = '0'
                    queue.append((nx, ny))

    for i in range(n):
        for j in range(m):
            if grid[i][j] == '1':
                islands += 1
                bfs(i, j)

    return islands