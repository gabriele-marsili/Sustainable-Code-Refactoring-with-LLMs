# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/unique-paths-ii/
#
# DESC:
# =====
# A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).
#
# The robot can only move either down or right at any point in time.
# The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).
#
# Now consider if some obstacles are added to the grids. How many unique paths would there be?
#
#
#
# An obstacle and empty space is marked as 1 and 0 respectively in the grid.
#
# Note: m and n will be at most 100.
#
# Example 1:
# Input:
# [
#   [0,0,0],
#   [0,1,0],
#   [0,0,0]
# ]
# Output: 2
# Explanation:
# There is one obstacle in the middle of the 3x3 grid above.
# There are two ways to reach the bottom-right corner:
# 1. Right -> Right -> Down -> Down
# 2. Down -> Down -> Right -> Right
#
################################################
from typing import List


class Solution:
    def uniquePathsWithObstacles(self, obstacleGrid: List[List[int]]) -> int:
        if not obstacleGrid or not obstacleGrid[0] or obstacleGrid[0][0] == 1:
            return 0
        
        m, n = len(obstacleGrid), len(obstacleGrid[0])
        
        if obstacleGrid[m-1][n-1] == 1:
            return 0
        
        prev_row = [0] * n
        prev_row[0] = 1
        
        for j in range(1, n):
            prev_row[j] = prev_row[j-1] if obstacleGrid[0][j] == 0 else 0
        
        for i in range(1, m):
            curr_row = [0] * n
            curr_row[0] = prev_row[0] if obstacleGrid[i][0] == 0 else 0
            
            for j in range(1, n):
                if obstacleGrid[i][j] == 0:
                    curr_row[j] = curr_row[j-1] + prev_row[j]
            
            prev_row = curr_row
        
        return prev_row[n-1]