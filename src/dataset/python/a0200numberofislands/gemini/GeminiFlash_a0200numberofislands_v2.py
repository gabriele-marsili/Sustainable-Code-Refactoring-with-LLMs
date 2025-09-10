# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/number-of-islands/
#
# DESC:
# =====
# Given a 2d grid map of '1's (land) and '0's (water), count the number of islands.
# An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.
# You may assume all four edges of the grid are all surrounded by water.
#
# Example 1:
# Input:
# 11110
# 11010
# 11000
# 00000
#
# Output: 1
#
# Example 2:
# Input:
# 11000
# 11000
# 00100
# 00011
#
# Output: 3
################################################
from typing import List


class Solution:
  def numIslands(self, grid: List[List[str]]) -> int:
    if not grid:
      return 0

    rows, cols = len(grid), len(grid[0])
    count = 0

    def dfs(i, j):
      if i < 0 or j < 0 or i >= rows or j >= cols or grid[i][j] != '1':
        return

      grid[i][j] = '#'  # Mark as visited
      dfs(i + 1, j)
      dfs(i - 1, j)
      dfs(i, j + 1)
      dfs(i, j - 1)

    for i in range(rows):
      for j in range(cols):
        if grid[i][j] == '1':
          dfs(i, j)
          count += 1

    return count