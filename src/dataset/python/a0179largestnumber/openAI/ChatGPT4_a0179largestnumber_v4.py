from typing import List


class Solution:

    def largestNumber(self, nums: List[int]) -> str:
        if not any(nums):
            return '0'
        nums = map(str, nums)
        nums = sorted(nums, key=lambda x: x * 10, reverse=True)
        return ''.join(nums)