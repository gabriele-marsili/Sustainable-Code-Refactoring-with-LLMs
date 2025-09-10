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
    n = len(grid)
    if n == 0:
        return 0
    m = len(grid[0])

    islands = 0
    directions = [(-1, 0), (0, 1), (1, 0), (0, -1)]

    for i in range(n):
        for j in range(m):
            if grid[i][j] == '1':
                islands += 1
                queue = deque([(i, j)])

                while queue:
                    x, y = queue.popleft()

                    if 0 <= x < n and 0 <= y < m and grid[x][y] == '1':
                        grid[x][y] = '0'  # Mark as visited

                        for dx, dy in directions:
                            next_x, next_y = x + dx, y + dy
                            queue.append((next_x, next_y))

    return islands