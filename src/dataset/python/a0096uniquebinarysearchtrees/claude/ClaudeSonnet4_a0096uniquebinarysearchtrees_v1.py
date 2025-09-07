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
    def numTrees(self, n: int) -> int:
        if n <= 1:
            return 1
        
        # Use Catalan number formula: C(n) = (2n)! / ((n+1)! * n!)
        # Optimized calculation to avoid large factorials
        result = 1
        for i in range(n):
            result = result * (n + i + 1) // (i + 1)
        return result // (n + 1)