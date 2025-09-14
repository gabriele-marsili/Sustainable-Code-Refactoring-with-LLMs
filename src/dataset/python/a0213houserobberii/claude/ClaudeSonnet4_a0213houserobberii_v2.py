# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/house-robber-ii/
#
# DESC:
# =====
# You are a professional robber planning to rob houses along a street.
# Each house has a certain amount of money stashed. All houses at this place are arranged in a circle.
# That means the first house is the neighbor of the last one.
# Meanwhile, adjacent houses have security system connected
# and it will automatically contact the police if two adjacent houses were broken into on the same night.
#
# Given a list of non-negative integers representing the amount of money of each house,
# determine the maximum amount of money you can rob tonight without alerting the police.
#
# Example 1:
# Input: [2,3,2]
# Output: 3
# Explanation: You cannot rob house 1 (money = 2) and then rob house 3 (money = 2),
#              because they are adjacent houses.
#
# Example 2:
# Input: [1,2,3,1]
# Output: 4
# Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
#              Total amount you can rob = 1 + 3 = 4.
################################################
from typing import List


class Solution:
  def rob(self, nums: List[int]) -> int:
    length = len(nums)
    if length == 0:
      return 0
    if length == 1:
      return nums[0]
    if length == 2:
      return max(nums[0], nums[1])

    # Rob houses 0 to n-2 (excluding last house)
    prev1, curr1 = 0, nums[0]
    for i in range(1, length - 1):
      prev1, curr1 = curr1, max(prev1 + nums[i], curr1)

    # Rob houses 1 to n-1 (excluding first house)
    prev2, curr2 = 0, nums[1]
    for i in range(2, length):
      prev2, curr2 = curr2, max(prev2 + nums[i], curr2)

    return max(curr1, curr2)