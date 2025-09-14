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
    if not grid or not grid[0]:
      return 0

    rows, cols = len(grid), len(grid[0])
    count = 0
    
    for i in range(rows):
      for j in range(cols):
        if grid[i][j] == '1':
          self.dfs(grid, i, j, rows, cols)
          count += 1

    return count

  def dfs(self, grid, i, j, rows, cols):
    stack = [(i, j)]
    
    while stack:
      x, y = stack.pop()
      
      if x < 0 or y < 0 or x >= rows or y >= cols or grid[x][y] != '1':
        continue
        
      grid[x][y] = '0'
      
      stack.extend([(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)])