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
    m = len(grid)
    n = len(grid[0])

    dp = [0] * n
    dp[0] = grid[0][0]

    for j in range(1, n):
      dp[j] = dp[j - 1] + grid[0][j]

    for i in range(1, m):
      dp[0] += grid[i][0]
      for j in range(1, n):
        dp[j] = min(dp[j - 1], dp[j]) + grid[i][j]

    return dp[-1]