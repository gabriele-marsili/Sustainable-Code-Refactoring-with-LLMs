# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/combination-sum-iii/
#
# DESC:
# =====
# Find all possible combinations of k numbers that add up to a number n,
# given that only numbers from 1 to 9 can be used and each combination should be a unique set of numbers.
#
# Note:
# All numbers will be positive integers.
# The solution set must not contain duplicate combinations.
#
# Example 1:
# Input: k = 3, n = 7
# Output: [[1,2,4]]
#
# Example 2:
# Input: k = 3, n = 9
# Output: [[1,2,6], [1,3,5], [2,3,4]]
################################################
from typing import List


class Solution:
  def combinationSum3(self, k: int, n: int) -> List[List[int]]:
    result = []
    self.helper(k, n, 1, [], result)
    return result

  def helper(self, k: int, n: int, start: int, combination: List[int], result: List[List[int]]):
    if n < 0:
      return

    if k == 0:
      if n == 0:
        result.append(combination.copy())
      return

    for i in range(start, min(10, n + 1)):
      combination.append(i)
      self.helper(k - 1, n - i, i + 1, combination, result)
      combination.pop()