# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/maximum-product-subarray/
#
# DESC:
# =====
# Given an integer array nums,
# find the contiguous subarray within an array (containing at least one number) which has the largest product.
#
# Example 1:
# Input: [2,3,-2,4]
# Output: 6
# Explanation: [2,3] has the largest product 6.
#
# Example 2:
# Input: [-2,0,-1]
# Output: 0
# Explanation: The result cannot be 2, because [-2,-1] is not a subarray.
################################################
from typing import List


class Solution:
  def maxProduct(self, nums: List[int]) -> int:
    result = iMax = iMin = nums[0]
    
    for num in nums[1:]:
      if num < 0:
        iMax, iMin = iMin, iMax
      
      temp_max = iMax * num
      iMax = num if num > temp_max else temp_max
      
      temp_min = iMin * num
      iMin = num if num < temp_min else temp_min
      
      if iMax > result:
        result = iMax

    return result