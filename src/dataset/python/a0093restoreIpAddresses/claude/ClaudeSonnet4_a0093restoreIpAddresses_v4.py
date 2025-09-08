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
        
        def is_valid_segment(segment: str) -> bool:
            if not segment or len(segment) > 3:
                return False
            if len(segment) > 1 and segment[0] == '0':
                return False
            num = int(segment)
            return num <= 255

        for i in range(1, min(4, length - 2)):
            segment1 = s[:i]
            if not is_valid_segment(segment1):
                continue
                
            for j in range(i + 1, min(i + 4, length - 1)):
                segment2 = s[i:j]
                if not is_valid_segment(segment2):
                    continue
                    
                for k in range(j + 1, min(j + 4, length)):
                    segment3 = s[j:k]
                    segment4 = s[k:]
                    
                    if is_valid_segment(segment3) and is_valid_segment(segment4):
                        result.append(f"{segment1}.{segment2}.{segment3}.{segment4}")
        
        return result