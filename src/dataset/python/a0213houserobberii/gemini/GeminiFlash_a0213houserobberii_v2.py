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

    def helper(nums, start, end):
      rob1, rob2 = 0, 0

      for i in range(start, end + 1):
        new_rob = max(rob1 + nums[i], rob2)
        rob1 = rob2
        rob2 = new_rob
      return rob2

    return max(helper(nums, 0, length - 2), helper(nums, 1, length - 1))