# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/set-matrix-zeroes/
#
# DESC:
# =====
# Given a m x n matrix, if an element is 0, set its entire row and column to 0. Do it in-place.
#
# Example 1:
#
# Input:
# [
#   [1,1,1],
#   [1,0,1],
#   [1,1,1]
# ]
# Output:
# [
#   [1,0,1],
#   [0,0,0],
#   [1,0,1]
# ]
#
# Example 2:
# Input:
# [
#   [0,1,2,0],
#   [3,4,5,2],
#   [1,3,1,5]
# ]
# Output:
# [
#   [0,0,0,0],
#   [0,4,5,0],
#   [0,3,1,0]
# ]
#
# Follow up:
# A straight forward solution using O(mn) space is probably a bad idea.
# A simple improvement uses O(m + n) space, but still not the best solution.
# Could you devise a constant space solution?"
#
################################################
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

    # Use markers to set elements to zero
    for i in range(1, m):
      for j in range(1, n):
        if matrix[i][0] == 0 or matrix[0][j] == 0:
          matrix[i][j] = 0

    # Set first row and column to zero if needed
    if first_row_zero:
      for j in range(n):
        matrix[0][j] = 0

    if first_col_zero:
      for i in range(m):
        matrix[i][0] = 0