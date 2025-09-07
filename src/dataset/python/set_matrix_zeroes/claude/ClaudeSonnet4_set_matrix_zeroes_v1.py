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
    if not matrix or not matrix[0]:
        return
    
    n = len(matrix)
    m = len(matrix[0])

    # check if 0 exist in first row and column
    first_row_zero = any(matrix[0][j] == 0 for j in range(m))
    first_col_zero = any(matrix[i][0] == 0 for i in range(n))

    # find which columns and rows should be 0
    for i in range(1, n):
        for j in range(1, m):
            if matrix[i][j] == 0:
                matrix[i][0] = 0
                matrix[0][j] = 0

    # set 0 if the row or column where this element is located is 0
    for i in range(1, n):
        if matrix[i][0] == 0:
            for j in range(1, m):
                matrix[i][j] = 0
        else:
            for j in range(1, m):
                if matrix[0][j] == 0:
                    matrix[i][j] = 0

    # fill the first row and column with 0 if needed
    if first_row_zero:
        for j in range(m):
            matrix[0][j] = 0
    if first_col_zero:
        for i in range(n):
            matrix[i][0] = 0