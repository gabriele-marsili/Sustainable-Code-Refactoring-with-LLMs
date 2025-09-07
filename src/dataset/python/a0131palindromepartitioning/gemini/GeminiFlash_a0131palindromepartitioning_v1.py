# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/palindrome-partitioning/
#
# DESC:
# =====
# Given a string s, partition s such that every substring of the partition is a palindrome.
#
# Return all possible palindrome partitioning of s.
#
# Example:
# Input: "aab"
# Output:
# [
#   ["aa","b"],
#   ["a","a","b"]
# ]
################################################
from typing import List


class Solution:
  def partition(self, s: str) -> List[List[str]]:
    result = []
    n = len(s)

    def is_palindrome(sub):
      return sub == sub[::-1]

    def backtrack(start, current_partition):
      if start == n:
        result.append(current_partition[:])  # Append a copy
        return

      for i in range(start + 1, n + 1):
        substring = s[start:i]
        if is_palindrome(substring):
          current_partition.append(substring)
          backtrack(i, current_partition)
          current_partition.pop()  # Backtrack

    backtrack(0, [])
    return result