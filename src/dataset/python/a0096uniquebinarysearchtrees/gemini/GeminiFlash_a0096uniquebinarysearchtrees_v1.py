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
    """
    Calculates the number of structurally unique BSTs for a given n.

    This implementation uses dynamic programming to efficiently compute the Catalan number,
    which represents the number of unique BSTs.  It avoids unnecessary list comprehensions
    and uses a more concise and efficient calculation.
    """
    dp = [0] * (n + 1)
    dp[0] = 1
    dp[1] = 1

    for i in range(2, n + 1):
      for j in range(1, i + 1):
        dp[i] += dp[j - 1] * dp[i - j]

    return dp[n]