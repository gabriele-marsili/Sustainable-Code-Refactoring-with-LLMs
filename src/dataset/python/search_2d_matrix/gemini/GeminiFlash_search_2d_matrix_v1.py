'''
Search a 2D Matrix

Write an efficient algorithm that searches for a value in an m x n matrix.
This matrix has the following properties:
- Integers in each row are sorted in ascending from left to right.
- Integers in each column are sorted in ascending from top to bottom.

Input: target = 21
[
  [1,   4,  7, 11, 15],
  [2,   5,  8, 12, 19],
  [3,   6,  9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
]
Output: True

=========================================
Start from top right corner and search in bottom left direction.
    Time Complexity:    O(N + M)
    Space Complexity:   O(1)
'''


############
# Solution #
############

def search_2d_matrix(matrix, target):
    if not matrix or not matrix[0]:
        return False

    row = 0
    col = len(matrix[0]) - 1

    while row < len(matrix) and col >= 0:
        if matrix[row][col] == target:
            return True
        elif matrix[row][col] < target:
            row += 1
        else:
            col -= 1

    return False