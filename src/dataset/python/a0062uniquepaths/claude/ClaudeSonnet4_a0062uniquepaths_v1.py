# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/unique-paths/
#
# DESC:
# =====
# A robot is located at the top-left corner of a m x n grid
# (marked 'Start' in the diagram below).
#
# The robot can only move either down or right at any point in time.
# The robot is trying to reach the bottom-right corner of the grid
# (marked 'Finish' in the diagram below).
#
# How many possible unique paths are there?
#
#
# Above is a 7 x 3 grid. How many possible unique paths are there?
#
# Note: m and n will be at most 100.
#
# Example 1:
# Input: m = 3, n = 2
# Output: 3
# Explanation:
# From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
# 1. Right -> Right -> Down
# 2. Right -> Down -> Right
# 3. Down -> Right -> Right
#
# Example 2:
# Input: m = 7, n = 3
# Output: 28
#
################################################


class Solution:
  def uniquePaths(self, m: int, n: int) -> int:
    # Use mathematical formula: C(m+n-2, m-1) = (m+n-2)! / ((m-1)! * (n-1)!)
    # This is equivalent to choosing m-1 right moves from m+n-2 total moves
    if m == 1 or n == 1:
      return 1
    
    # Calculate combination efficiently to avoid large factorials
    total_moves = m + n - 2
    right_moves = min(m - 1, n - 1)  # Choose smaller value for efficiency
    
    result = 1
    for i in range(right_moves):
      result = result * (total_moves - i) // (i + 1)
    
    return result