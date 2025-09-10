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

def num_of_islands(grid):
    n = len(grid)
    if n == 0:
        return 0
    m = len(grid[0])

    islands = 0

    def bfs(i, j):
        if i < 0 or i >= n or j < 0 or j >= m or grid[i][j] != '1':
            return

        grid[i][j] = '0'  # Mark as visited

        bfs(i + 1, j)
        bfs(i - 1, j)
        bfs(i, j + 1)
        bfs(i, j - 1)

    for i in range(n):
        for j in range(m):
            if grid[i][j] == '1':
                islands += 1
                bfs(i, j)

    return islands