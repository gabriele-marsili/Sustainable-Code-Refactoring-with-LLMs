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
from typing import List


class Solution:

  def largestNumber(self, nums: List[int]) -> str:
    nums = [str(x) for x in nums]
    nums.sort(key=self.__comparator, reverse=True)
    return ''.join(nums).lstrip('0') or '0'

  def __comparator(self, a, b):
    return (a + b > b + a) - (a + b < b + a)