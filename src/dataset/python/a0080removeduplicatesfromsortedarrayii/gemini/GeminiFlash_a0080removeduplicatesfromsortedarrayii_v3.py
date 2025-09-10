# -*- coding: utf-8 -*-

from typing import List


class Solution:
  def removeDuplicates(self, nums: List[int]) -> int:
    if len(nums) <= 2:
      return len(nums)

    k = 2  # Index to place the next non-duplicate element
    for i in range(2, len(nums)):
      if nums[i] != nums[k - 2]:
        nums[k] = nums[i]
        k += 1

    return k