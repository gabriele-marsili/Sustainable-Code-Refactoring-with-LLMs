'''
Spiral Matrix

Given a matrix of m x n elements (m rows, n columns), return all elements of the matrix in spiral order.

Input:
[
 [ 1, 2, 3 ],
 [ 4, 5, 6 ],
 [ 7, 8, 9 ]
]
Output: [1, 2, 3, 6, 9, 8, 7, 4, 5]

Input:
[
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12]
]
Output: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]

=========================================
Simulate spiral moving, start from (0,0) and when a border is reached change the X or Y direction.
    Time Complexity:    O(N*M)
    Space Complexity:   O(N*M)
'''


############
# Solution #
############

def spiral_matrix(matrix):
    if not matrix or not matrix[0]:
        return []

    rows, cols = len(matrix), len(matrix[0])
    total = rows * cols
    res = [0] * total
    idx = 0
    
    top, bottom = 0, rows - 1
    left, right = 0, cols - 1
    
    while idx < total:
        # Move right
        for col in range(left, right + 1):
            res[idx] = matrix[top][col]
            idx += 1
        top += 1
        
        # Move down
        for row in range(top, bottom + 1):
            res[idx] = matrix[row][right]
            idx += 1
        right -= 1
        
        # Move left (if we still have rows)
        if top <= bottom:
            for col in range(right, left - 1, -1):
                res[idx] = matrix[bottom][col]
                idx += 1
            bottom -= 1
        
        # Move up (if we still have columns)
        if left <= right:
            for row in range(bottom, top - 1, -1):
                res[idx] = matrix[row][left]
                idx += 1
            left += 1
    
    return res