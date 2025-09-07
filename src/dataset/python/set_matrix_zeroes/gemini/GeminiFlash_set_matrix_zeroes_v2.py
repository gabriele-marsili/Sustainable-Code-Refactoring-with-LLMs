'''
Set Matrix Zeroes

Given a m x n matrix, if an element is 0, set its entire row and column to 0. Do it in-place.

Input:
[
  [1,1,1],
  [1,0,1],
  [1,1,1]
]
Output:
[
  [1,0,1],
  [0,0,0],
  [1,0,1]
]

=========================================
Use first column and first row for marking when 0 is found.
    Time Complexity:    O(N*M)
    Space Complexity:   O(1)
'''


############
# Solution #
############

def set_matrix_zeroes(matrix):
    n = len(matrix)
    if n == 0:
        return

    m = len(matrix[0])
    first_row_zero = False
    first_col_zero = False

    # Check if first row has zero
    for j in range(m):
        if matrix[0][j] == 0:
            first_row_zero = True
            break

    # Check if first column has zero
    for i in range(n):
        if matrix[i][0] == 0:
            first_col_zero = True
            break

    # Use first row and first column as markers
    for i in range(1, n):
        for j in range(1, m):
            if matrix[i][j] == 0:
                matrix[0][j] = 0
                matrix[i][0] = 0

    # Zero out the matrix based on markers
    for i in range(1, n):
        for j in range(1, m):
            if matrix[0][j] == 0 or matrix[i][0] == 0:
                matrix[i][j] = 0

    # Zero out first row if needed
    if first_row_zero:
        for j in range(m):
            matrix[0][j] = 0

    # Zero out first column if needed
    if first_col_zero:
        for i in range(n):
            matrix[i][0] = 0