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


class Solution:

  def largestNumber(self, nums: List[int]) -> str:
    # Early return for edge cases
    if not nums or all(num == 0 for num in nums):
      return '0'
    
    # Convert to strings once
    str_nums = [str(x) for x in nums]
    
    # Sort with optimized comparator
    str_nums.sort(key=functools.cmp_to_key(lambda a, b: -1 if a + b > b + a else 1))
    
    # Join and handle leading zeros
    result = ''.join(str_nums)
    return result if result[0] != '0' else '0'