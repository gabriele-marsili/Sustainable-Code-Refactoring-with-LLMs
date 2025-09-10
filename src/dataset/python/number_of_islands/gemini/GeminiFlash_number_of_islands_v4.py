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
    if not grid:
        return 0

    rows, cols = len(grid), len(grid[0])
    num_islands = 0

    def sink_island(row, col):
        if row < 0 or row >= rows or col < 0 or col >= cols or grid[row][col] == '0':
            return

        grid[row][col] = '0'  # Sink the land

        # Recursively sink adjacent land
        sink_island(row + 1, col)
        sink_island(row - 1, col)
        sink_island(row, col + 1)
        sink_island(row, col - 1)

    for i in range(rows):
        for j in range(cols):
            if grid[i][j] == '1':
                num_islands += 1
                sink_island(i, j)

    return num_islands