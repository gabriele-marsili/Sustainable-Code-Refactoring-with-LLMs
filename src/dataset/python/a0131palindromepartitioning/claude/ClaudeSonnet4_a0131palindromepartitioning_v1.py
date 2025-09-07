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
        n = len(s)
        # Precompute palindrome table
        is_palindrome = [[False] * n for _ in range(n)]
        
        # Every single character is a palindrome
        for i in range(n):
            is_palindrome[i][i] = True
        
        # Check for palindromes of length 2
        for i in range(n - 1):
            if s[i] == s[i + 1]:
                is_palindrome[i][i + 1] = True
        
        # Check for palindromes of length 3 and more
        for length in range(3, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1
                if s[i] == s[j] and is_palindrome[i + 1][j - 1]:
                    is_palindrome[i][j] = True
        
        result = []
        self._backtrack(s, 0, [], result, is_palindrome)
        return result
    
    def _backtrack(self, s: str, start: int, path: List[str], result: List[List[str]], is_palindrome: List[List[bool]]):
        if start == len(s):
            result.append(path[:])
            return
        
        for end in range(start, len(s)):
            if is_palindrome[start][end]:
                path.append(s[start:end + 1])
                self._backtrack(s, end + 1, path, result, is_palindrome)
                path.pop()

    def isPalindrome(self, s):
        length = len(s)
        for i in range(length // 2):
            if s[i] != s[length - 1 - i]:
                return False
        return True