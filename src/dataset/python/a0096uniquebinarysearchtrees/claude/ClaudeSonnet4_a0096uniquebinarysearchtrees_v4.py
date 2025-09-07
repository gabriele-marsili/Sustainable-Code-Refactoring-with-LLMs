# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/unique-binary-search-trees/
#
# DESC:
# =====
# Given n, how many structurally unique BST's (binary search trees) that store values 1 ... n?
#
# Example:
# Input: 3
# Output: 5
# Explanation:
# Given n = 3, there are a total of 5 unique BST's:
#
#    1         3     3      2      1
#     \       /     /      / \      \
#      3     2     1      1   3      2
#     /     /       \                 \
#    2     1         2                 3?
#
################################################


class Solution:
    _cache = {0: 1, 1: 1}
    
    def numTrees(self, n: int) -> int:
        if n in self._cache:
            return self._cache[n]
        
        if n <= 1:
            return 1
            
        result = 0
        for i in range(n):
            left = self.numTrees(i)
            right = self.numTrees(n - 1 - i)
            result += left * right
            
        self._cache[n] = result
        return result