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
from collections import deque


class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        if not grid or not grid[0]:
            return 0

        rows, cols = len(grid), len(grid[0])
        count = 0
        
        for i in range(rows):
            for j in range(cols):
                if grid[i][j] == '1':
                    self._bfs(grid, i, j, rows, cols)
                    count += 1

        return count

    def _bfs(self, grid, start_i, start_j, rows, cols):
        queue = deque([(start_i, start_j)])
        grid[start_i][start_j] = '0'
        
        directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]
        
        while queue:
            i, j = queue.popleft()
            
            for di, dj in directions:
                ni, nj = i + di, j + dj
                if 0 <= ni < rows and 0 <= nj < cols and grid[ni][nj] == '1':
                    grid[ni][nj] = '0'
                    queue.append((ni, nj))

    def dfs(self, grid, i, j):
        if i < 0 or j < 0 or i >= len(grid) or j >= len(grid[0]) or grid[i][j] != '1':
            return

        grid[i][j] = '#'
        self.dfs(grid, i + 1, j)
        self.dfs(grid, i - 1, j)
        self.dfs(grid, i, j + 1)
        self.dfs(grid, i, j - 1)