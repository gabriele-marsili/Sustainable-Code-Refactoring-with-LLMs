'''
River Sizes

You are given a two-dimensional array (matrix) of potentially unequal height and width containing only 0s and 1s.
Each 0 represents land, and each 1 represents part of a river. A river consists of any number of 1s that are
either horizontally or vertically adjacent (but not diagonally adjacent).
The number of adjacent 1s forming a river determine its size.
Write a function that returns an array of the sizes of all rivers represented in the input matrix.
Note that these sizes do not need to be in any particular order.

Input:
[
[1, 0, 0, 1],
[1, 0, 1, 0],
[0, 0, 1, 0],
[1, 0, 1, 0]
]
Output: [2, 1, 3, 1]

=========================================
This problem can be solved using DFS or BFS.
If 1 is found, find all horizontal or vertical neighbours (1s), and mark them as 0.
    Time Complexity:    O(N*M)
    Space Complexity:   O(N*M)     , because of recursion calls stack
'''


############
# Solution #
############

def river_sizes(matrix):
    n = len(matrix)
    m = len(matrix[0])

    results = []
    visited = set()

    def dfs(i, j):
        if (i, j) in visited or i < 0 or i >= n or j < 0 or j >= m or matrix[i][j] == 0:
            return 0

        visited.add((i, j))
        size = 1
        size += dfs(i + 1, j)
        size += dfs(i - 1, j)
        size += dfs(i, j + 1)
        size += dfs(i, j - 1)
        return size

    for i in range(n):
        for j in range(m):
            if matrix[i][j] == 1 and (i, j) not in visited:
                size = dfs(i, j)
                results.append(size)

    return results