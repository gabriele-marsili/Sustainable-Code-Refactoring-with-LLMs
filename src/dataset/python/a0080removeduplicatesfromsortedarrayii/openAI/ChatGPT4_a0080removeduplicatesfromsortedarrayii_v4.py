from typing import List

class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        n = len(nums)
        if n < 3:
            return n

        i = 1
        for fast in range(2, n):
            if nums[fast] != nums[i - 1]:
                i += 1
                nums[i] = nums[fast]

        return i + 1