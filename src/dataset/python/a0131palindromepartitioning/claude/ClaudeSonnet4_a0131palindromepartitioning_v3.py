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
    def __init__(self):
        self._palindrome_cache = {}
    
    def partition(self, s: str) -> List[List[str]]:
        self._palindrome_cache.clear()
        self._precompute_palindromes(s)
        result = []
        self._backtrack(s, 0, [], result)
        return result
    
    def _precompute_palindromes(self, s: str) -> None:
        n = len(s)
        for i in range(n):
            for j in range(i, n):
                substring = s[i:j+1]
                self._palindrome_cache[substring] = self._is_palindrome_optimized(substring)
    
    def _is_palindrome_optimized(self, s: str) -> bool:
        left, right = 0, len(s) - 1
        while left < right:
            if s[left] != s[right]:
                return False
            left += 1
            right -= 1
        return True
    
    def _backtrack(self, s: str, start: int, current: List[str], result: List[List[str]]) -> None:
        if start == len(s):
            result.append(current[:])
            return
        
        for end in range(start, len(s)):
            substring = s[start:end+1]
            if self._palindrome_cache[substring]:
                current.append(substring)
                self._backtrack(s, end + 1, current, result)
                current.pop()
    
    def isPalindrome(self, s: str) -> bool:
        return self._palindrome_cache.get(s, self._is_palindrome_optimized(s))