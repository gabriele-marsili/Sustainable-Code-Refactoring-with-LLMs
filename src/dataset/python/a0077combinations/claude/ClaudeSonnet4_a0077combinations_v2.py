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
        
        result = []
        
        def backtrack(start: int, path: List[int]) -> None:
            if len(path) == k:
                result.append(path[:])
                return
            
            # Early termination: if remaining numbers can't fill the path
            remaining_needed = k - len(path)
            remaining_available = n - start + 1
            if remaining_needed > remaining_available:
                return
            
            for i in range(start, n + 1):
                path.append(i)
                backtrack(i + 1, path)
                path.pop()
        
        backtrack(1, [])
        return result