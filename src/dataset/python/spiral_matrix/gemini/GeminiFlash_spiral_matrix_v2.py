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
    if not matrix:
        return []

    result = []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1
    direction = 0  # 0: right, 1: down, 2: left, 3: up

    while top <= bottom and left <= right:
        if direction == 0:  # right
            for i in range(left, right + 1):
                result.append(matrix[top][i])
            top += 1
        elif direction == 1:  # down
            for i in range(top, bottom + 1):
                result.append(matrix[i][right])
            right -= 1
        elif direction == 2:  # left
            for i in range(right, left - 1, -1):
                result.append(matrix[bottom][i])
            bottom -= 1
        elif direction == 3:  # up
            for i in range(bottom, top - 1, -1):
                result.append(matrix[i][left])
            left += 1
        direction = (direction + 1) % 4

    return result