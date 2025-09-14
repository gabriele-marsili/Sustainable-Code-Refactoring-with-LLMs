from collections import deque

def num_of_islands(grid):
    if not grid or not grid[0]:
        return 0
    
    n, m = len(grid), len(grid[0])
    islands = 0
    directions = [(-1, 0), (0, 1), (1, 0), (0, -1)]
    
    for i in range(n):
        for j in range(m):
            if grid[i][j] == '1':
                islands += 1
                grid[i][j] = '0'
                queue = deque([(i, j)])
                
                while queue:
                    x, y = queue.popleft()
                    
                    for dx, dy in directions:
                        next_x, next_y = x + dx, y + dy
                        if 0 <= next_x < n and 0 <= next_y < m and grid[next_x][next_y] == '1':
                            grid[next_x][next_y] = '0'
                            queue.append((next_x, next_y))
    
    return islands