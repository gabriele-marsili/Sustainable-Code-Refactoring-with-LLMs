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
      segment_len = len(segment)
      if segment_len > 3 or segment_len == 0:
        return False
      if segment_len > 1 and segment[0] == '0':
        return False
      if int(segment) > 255:
        return False
      return True

    def backtrack(start: int, dots: int, current_ip: str):
      if dots == 4:
        if start == length:
          result.append(current_ip[:-1])  # Remove trailing dot
        return

      for i in range(start + 1, min(start + 4, length + 1)):
        segment = s[start:i]
        if isValid(segment):
          backtrack(i, dots + 1, current_ip + segment + ".")

    backtrack(0, 0, "")
    return result