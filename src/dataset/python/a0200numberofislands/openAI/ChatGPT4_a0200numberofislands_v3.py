from typing import List
from collections import deque

class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        if not grid or not grid[0]:
            return 0

        rows, cols = len(grid), len(grid[0])
        count = 0

        def bfs(r, c):
            queue = deque([(r, c)])
            while queue:
                x, y = queue.popleft()
                for dx, dy in ((0, 1), (1, 0), (0, -1), (-1, 0)):
                    nx, ny = x + dx, y + dy
                    if 0 <= nx < rows and 0 <= ny < cols and grid[nx][ny] == '1':
                        grid[nx][ny] = '#'
                        queue.append((nx, ny))

        for i in range(rows):
            for j in range(cols):
                if grid[i][j] == '1':
                    count += 1
                    grid[i][j] = '#'
                    bfs(i, j)

        return count