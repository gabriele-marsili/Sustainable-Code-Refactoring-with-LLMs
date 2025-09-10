# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/spiral-matrix/
#
# DESC:
# =====
# Given a matrix of m x n elements (m rows, n columns),
# return all elements of the matrix in spiral order.
#
#
################################################
from typing import List


class Solution:
    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
        result = []
        top, bottom = 0, len(matrix)
        left, right = 0, len(matrix[0]) if matrix else 0

        while top < bottom and left < right:
            # Traverse top row
            for i in range(left, right):
                result.append(matrix[top][i])
            top += 1

            # Traverse right column
            for i in range(top, bottom):
                result.append(matrix[i][right - 1])
            right -= 1

            if not (top < bottom and left < right):
                break

            # Traverse bottom row
            for i in range(right - 1, left - 1, -1):
                result.append(matrix[bottom - 1][i])
            bottom -= 1

            # Traverse left column
            for i in range(bottom - 1, top - 1, -1):
                result.append(matrix[i][left])
            left += 1

        return result