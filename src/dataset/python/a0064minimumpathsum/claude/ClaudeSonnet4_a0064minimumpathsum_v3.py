# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/minimum-path-sum/
#
# DESC:
# =====
# Given a m x n grid filled with non-negative numbers,
# find a path from top left to bottom right which minimizes the sum of all numbers along its path.
#
# Note: You can only move either down or right at any point in time.
#
# Example:
#
# Input:
# [
#   [1,3,1],
#   [1,5,1],
#   [4,2,1]
# ]
# Output: 7
# Explanation: Because the path 1→3→1→1→1 minimizes the sum.
#
################################################
from typing import List


class Solution:
    def minPathSum(self, grid: List[List[int]]) -> int:
        if not grid or not grid[0]:
            return 0
        
        m, n = len(grid), len(grid[0])
        
        if m == 1:
            return sum(grid[0])
        if n == 1:
            return sum(row[0] for row in grid)
        
        prev_row = grid[0][:]
        for j in range(1, n):
            prev_row[j] += prev_row[j - 1]
        
        for i in range(1, m):
            prev_row[0] += grid[i][0]
            for j in range(1, n):
                prev_row[j] = grid[i][j] + min(prev_row[j], prev_row[j - 1])
        
        return prev_row[n - 1]