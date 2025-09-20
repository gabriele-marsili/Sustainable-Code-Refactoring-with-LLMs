# -*- coding: utf-8 -*-
from typing import List


class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        if not grid:
            return 0

        rows, cols = len(grid), len(grid[0])
        count = 0

        def dfs(i: int, j: int):
            stack = [(i, j)]
            while stack:
                x, y = stack.pop()
                if 0 <= x < rows and 0 <= y < cols and grid[x][y] == '1':
                    grid[x][y] = '#'
                    stack.extend([(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)])

        for i in range(rows):
            for j in range(cols):
                if grid[i][j] == '1':
                    dfs(i, j)
                    count += 1

        return count