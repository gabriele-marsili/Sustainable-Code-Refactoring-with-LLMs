from typing import List

class Solution:
    def rob(self, nums: List[int]) -> int:
        if len(nums) == 1:
            return nums[0]
        if not nums:
            return 0

        def helper(nums, start, end):
            prev, current = 0, 0
            for i in range(start, end + 1):
                prev, current = current, max(prev + nums[i], current)
            return current

        return max(helper(nums, 0, len(nums) - 2), helper(nums, 1, len(nums) - 1))