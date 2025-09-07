from typing import List


class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        complement_map = {}
        for i, val in enumerate(nums):
            if val in complement_map:
                return [complement_map[val], i]
            complement_map[target - val] = i
        return [-1, -1]