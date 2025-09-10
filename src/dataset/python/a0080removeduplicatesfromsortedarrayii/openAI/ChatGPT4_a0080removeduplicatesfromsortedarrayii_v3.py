from typing import List

class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        if len(nums) <= 2:
            return len(nums)

        i = 1
        for fast in range(2, len(nums)):
            if nums[fast] != nums[i - 1]:
                i += 1
                nums[i] = nums[fast]

        return i + 1