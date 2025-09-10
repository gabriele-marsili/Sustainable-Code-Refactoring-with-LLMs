from typing import List

class Solution:
    def canJump(self, nums: List[int]) -> bool:
        furthest = 0
        for i, num in enumerate(nums):
            if i > furthest:
                return False
            furthest = max(furthest, i + num)
            if furthest >= len(nums) - 1:
                return True
        return False