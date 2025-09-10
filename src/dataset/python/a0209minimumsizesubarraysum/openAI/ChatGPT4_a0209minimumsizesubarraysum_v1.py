# -*- coding: utf-8 -*-
from typing import List

class Solution:
    def minSubArrayLen(self, s: int, nums: List[int]) -> int:
        start, current_sum, min_len = 0, 0, float('inf')

        for end in range(len(nums)):
            current_sum += nums[end]
            while current_sum >= s:
                min_len = min(min_len, end - start + 1)
                current_sum -= nums[start]
                start += 1

        return min_len if min_len != float('inf') else 0