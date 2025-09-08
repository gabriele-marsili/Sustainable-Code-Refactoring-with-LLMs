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
        if k > 9 or n < k or n > 45:
            return []
        
        min_sum = k * (k + 1) // 2
        max_sum = k * (19 - k) // 2
        
        if n < min_sum or n > max_sum:
            return []
        
        result = []
        self._backtrack(k, n, 1, [], result)
        return result
    
    def _backtrack(self, k: int, target: int, start: int, path: List[int], result: List[List[int]]) -> None:
        if k == 0:
            if target == 0:
                result.append(path[:])
            return
        
        if target <= 0 or start > 9:
            return
        
        remaining_min = k * (2 * start + k - 1) // 2
        remaining_max = k * (19 - k) // 2
        
        if target < remaining_min or target > remaining_max:
            return
        
        for num in range(start, min(10, target + 1)):
            if target - num < (k - 1) * (k) // 2:
                break
            
            path.append(num)
            self._backtrack(k - 1, target - num, num + 1, path, result)
            path.pop()