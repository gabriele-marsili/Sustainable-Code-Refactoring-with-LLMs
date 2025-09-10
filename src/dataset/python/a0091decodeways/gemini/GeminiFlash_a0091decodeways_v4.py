# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/decode-ways/
#
# DESC:
# =====
# A message containing letters from A-Z is being encoded to numbers using the following mapping:
# 'A' -> 1
# 'B' -> 2
# ...
# 'Z' -> 26
# Given a non-empty string containing only digits, determine the total number of ways to decode it.
#
# Example 1:
# Input: "12"
# Output: 2
# Explanation: It could be decoded as "AB" (1 2) or "L" (12).
#
# Example 2:
# Input: "226"
# Output: 3
# Explanation: It could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).]
#
################################################


class Solution:
  def numDecodings(self, s: str) -> int:
    n = len(s)
    if not s:
      return 0

    dp1, dp2 = 1, 0 if s[0] == '0' else 1

    for i in range(1, n):
      current_dp = 0
      one_digit = int(s[i])
      two_digits = int(s[i-1:i+1])

      if 1 <= one_digit <= 9:
        current_dp += dp2
      if 10 <= two_digits <= 26:
        current_dp += dp1

      dp1, dp2 = dp2, current_dp

    return dp2