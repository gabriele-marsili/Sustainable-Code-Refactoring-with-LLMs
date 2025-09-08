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
        max_prod = min_prod = result = nums[0]
        
        for num in nums[1:]:
            if num < 0:
                max_prod, min_prod = min_prod, max_prod
            
            max_prod = num if num > max_prod * num else max_prod * num
            min_prod = num if num < min_prod * num else min_prod * num
            
            if max_prod > result:
                result = max_prod
        
        return result