from typing import List

class Solution:
    def findPeakElement(self, nums: List[int]) -> int:
        start, end = 0, len(nums) - 1
        while start < end:
            middle = (start + end) // 2
            if nums[middle] > nums[middle + 1]:
                end = middle
            else:
                start = middle + 1
        return start