# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/largest-number/
#
# DESC:
# =====
# Given a list of non negative integers, arrange them such that they form the largest number.
#
# Example 1:
# Input: [10,2]
# Output: "210"
#
# Example 2:
# Input: [3,30,34,5,9]
# Output: "9534330"
#
# Note: The result may be very large, so you need to return a string instead of an integer.
################################################
import functools
from typing import List


class LargerNumKey(str):
    def __lt__(x, y):
        return x + y > y + x


class Solution:

    def largestNumber(self, nums: List[int]) -> str:
        largest = ''.join(sorted(map(str, nums), key=LargerNumKey))
        return '0' if largest[0] == '0' else largest

    def __comparator(self, a, b):
        if a + b > b + a:
            return -1
        else:
            return 1