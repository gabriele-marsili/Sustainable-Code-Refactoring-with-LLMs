'''
Number of Islands

Given a 2d grid map of '1's (land) and '0's (water), count the number of islands.
An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.
You may assume all four edges of the grid are all surrounded by water.

Input:  [
            ['1','1','1','1','0'],
            ['1','1','0','1','0'],
            ['1','1','0','0','0'],
            ['0','0','0','0','0']
        ]
Output: 1

Input:  [
            ['1','1','0','0','0'],
            ['1','1','0','0','0'],
            ['0','0','1','0','0'],
            ['0','0','0','1','1']
        ]
Output: 3

=========================================
This problem can be solved in several ways (using DFS recursion or using the stack data structure) i'll solve it with BFS using Queue data structure.
    Time Complexity:    O(M * N)
    Space Complexity:   O(M * N)
'''


############
# Solution #
############

from collections import deque

def num_of_islands(grid):
    if not grid or not grid[0]:
        return 0
    
    n, m = len(grid), len(grid[0])
    islands = 0
    
    for i in range(n):
        for j in range(m):
            if grid[i][j] == '1':
                islands += 1
                queue = deque([(i, j)])
                grid[i][j] = '0'
                
                while queue:
                    x, y = queue.popleft()
                    
                    for dx, dy in [(-1, 0), (0, 1), (1, 0), (0, -1)]:
                        nx, ny = x + dx, y + dy
                        if 0 <= nx < n and 0 <= ny < m and grid[nx][ny] == '1':
                            grid[nx][ny] = '0'
                            queue.append((nx, ny))
    
    return islands