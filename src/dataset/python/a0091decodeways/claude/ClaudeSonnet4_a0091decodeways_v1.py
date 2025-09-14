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
    if not s or s[0] == '0':
      return 0
    
    length = len(s)
    if length == 1:
      return 1
    
    # Use O(1) space instead of O(n)
    prev2 = 1  # count[i-2]
    prev1 = 1  # count[i-1]
    
    for i in range(1, length):
      current = 0
      
      # Single digit decode
      if s[i] != '0':
        current += prev1
      
      # Two digit decode
      two_digit = int(s[i-1:i+1])
      if 10 <= two_digit <= 26:
        current += prev2
      
      if current == 0:
        return 0
      
      prev2, prev1 = prev1, current
    
    return prev1