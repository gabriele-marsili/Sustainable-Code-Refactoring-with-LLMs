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
    if not matrix or not matrix[0]:
        return []
    
    n = len(matrix)
    m = len(matrix[0])
    results = []
    
    # Pre-define directions to avoid repeated list creation
    directions = [(-1, 0), (0, -1), (1, 0), (0, 1)]

    for i in range(n):
        for j in range(m):
            if matrix[i][j] == 1:
                # Use iterative DFS to avoid recursion overhead
                size = 0
                stack = [(i, j)]
                
                while stack:
                    curr_i, curr_j = stack.pop()
                    
                    # Check bounds and if it's part of river
                    if (0 <= curr_i < n and 0 <= curr_j < m and 
                        matrix[curr_i][curr_j] == 1):
                        
                        matrix[curr_i][curr_j] = 0
                        size += 1
                        
                        # Add neighbors to stack
                        for di, dj in directions:
                            stack.append((curr_i + di, curr_j + dj))
                
                if size > 0:
                    results.append(size)

    return results