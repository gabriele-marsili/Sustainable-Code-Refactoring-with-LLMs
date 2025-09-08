# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/restore-ip-addresses/
#
# DESC:
# =====
# Given a string containing only digits,
# restore it by returning all possible valid IP address combinations.
#
# Example:
# Input: "25525511135"
# Output: ["255.255.11.135", "255.255.111.35"]
#
################################################
from typing import List


class Solution:
  def restoreIpAddresses(self, s: str) -> List[str]:
    length = len(s)
    if length > 12 or length < 4:
      return []

    result = []

    def isValid(segment: str) -> bool:
      if not segment:
        return False
      if len(segment) > 1 and segment[0] == '0':
        return False
      return 0 <= int(segment) <= 255

    def backtrack(start: int, dots: int, current_ip: str):
      if dots == 4:
        if start == length:
          result.append(current_ip[:-1])  # Remove trailing dot
        return

      for i in range(1, min(4, length - start + 1)):
        segment = s[start:start + i]
        if isValid(segment):
          backtrack(start + i, dots + 1, current_ip + segment + ".")

    backtrack(0, 0, "")
    return result