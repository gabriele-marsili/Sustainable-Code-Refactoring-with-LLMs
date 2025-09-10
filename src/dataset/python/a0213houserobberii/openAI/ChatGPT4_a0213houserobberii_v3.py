from typing import List

class Solution:
    def rob(self, nums: List[int]) -> int:
        if len(nums) == 1:
            return nums[0]
        if not nums:
            return 0
        return max(self.helper(nums[:-1]), self.helper(nums[1:]))

    def helper(self, nums: List[int]) -> int:
        prev, current = 0, 0
        for num in nums:
            prev, current = current, max(prev + num, current)
        return current