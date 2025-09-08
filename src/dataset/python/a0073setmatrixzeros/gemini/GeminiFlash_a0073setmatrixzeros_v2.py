from typing import List


class Solution:
  def setZeroes(self, matrix: List[List[int]]) -> None:
    """
    Do not return anything, modify matrix in-place instead.
    """
    m = len(matrix)
    n = len(matrix[0])

    first_row_zero = False
    first_col_zero = False

    # Check if first row has zero
    for j in range(n):
      if matrix[0][j] == 0:
        first_row_zero = True
        break

    # Check if first column has zero
    for i in range(m):
      if matrix[i][0] == 0:
        first_col_zero = True
        break

    # Use first row and first column as markers
    for i in range(1, m):
      for j in range(1, n):
        if matrix[i][j] == 0:
          matrix[i][0] = 0
          matrix[0][j] = 0

    # Set zeroes based on markers
    for i in range(1, m):
      for j in range(1, n):
        if matrix[i][0] == 0 or matrix[0][j] == 0:
          matrix[i][j] = 0

    # Set zeroes for first row and column if needed
    if first_row_zero:
      for j in range(n):
        matrix[0][j] = 0

    if first_col_zero:
      for i in range(m):
        matrix[i][0] = 0