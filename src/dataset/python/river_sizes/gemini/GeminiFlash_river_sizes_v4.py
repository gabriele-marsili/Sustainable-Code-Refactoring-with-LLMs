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
    sizes = []
    visited = [[False for _ in range(m)] for _ in range(n)]

    for i in range(n):
        for j in range(m):
            if visited[i][j]:
                continue
            if matrix[i][j] == 0:
                continue
            size = dfs(i, j, matrix, visited)
            sizes.append(size)
    return sizes

def dfs(i, j, matrix, visited):
    size = 0
    stack = [(i, j)]
    visited[i][j] = True

    while stack:
        i, j = stack.pop()
        size += 1

        neighbors = get_unvisited_neighbors(i, j, matrix, visited)
        for row, col in neighbors:
            visited[row][col] = True
            stack.append((row, col))
    return size

def get_unvisited_neighbors(i, j, matrix, visited):
    neighbors = []
    n = len(matrix)
    m = len(matrix[0])

    if i > 0 and not visited[i-1][j] and matrix[i-1][j] == 1:
        neighbors.append((i-1, j))
    if i < n - 1 and not visited[i+1][j] and matrix[i+1][j] == 1:
        neighbors.append((i+1, j))
    if j > 0 and not visited[i][j-1] and matrix[i][j-1] == 1:
        neighbors.append((i, j-1))
    if j < m - 1 and not visited[i][j+1] and matrix[i][j+1] == 1:
        neighbors.append((i, j+1))
    return neighbors