# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/combinations/
#
# DESC:
# =====
# Given two integers n and k, return all possible combinations of k numbers out of 1 ... n.
#
# Example:
#
# Input: n = 4, k = 2
# Output:
# [
#   [2,4],
#   [3,4],
#   [2,3],
#   [1,2],
#   [1,3],
#   [1,4],
# ]
#
################################################
from typing import List


class Solution:
  def combine(self, n: int, k: int) -> List[List[int]]:
    if k == 0:
      return [[]]
    if k > n:
      return []
    if k == n:
      return [list(range(1, n + 1))]
    if k == 1:
      return [[i] for i in range(1, n + 1)]

    combinations = []

    def backtrack(start, combination):
      if len(combination) == k:
        combinations.append(combination.copy())
        return

      for i in range(start, n + 1):
        combination.append(i)
        backtrack(i + 1, combination)
        combination.pop()

    backtrack(1, [])
    return combinations