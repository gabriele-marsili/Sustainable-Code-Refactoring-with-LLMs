# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/spiral-matrix/
#
# DESC:
# =====
# Given a positive integer n,
# generate a square matrix filled with elements from 1 to n2 in spiral order.
#
# Example:
#
# Input: 3
# Output:
# [
#  [ 1, 2, 3 ],
#  [ 8, 9, 4 ],
#  [ 7, 6, 5 ]
# ]
#
#
################################################
from typing import List


class Solution:

  def generateMatrix(self, n: int) -> List[List[int]]:
    matrix = [[0] * n for _ in range(n)]
    num = 1
    top, bottom = 0, n - 1
    left, right = 0, n - 1

    while num <= n * n:
      # Traverse right
      for i in range(left, right + 1):
        matrix[top][i] = num
        num += 1
      top += 1

      # Traverse down
      for i in range(top, bottom + 1):
        matrix[i][right] = num
        num += 1
      right -= 1

      # Traverse left
      if top <= bottom:
        for i in range(right, left - 1, -1):
          matrix[bottom][i] = num
          num += 1
        bottom -= 1

      # Traverse up
      if left <= right:
        for i in range(bottom, top - 1, -1):
          matrix[i][left] = num
          num += 1
        left += 1

    return matrix