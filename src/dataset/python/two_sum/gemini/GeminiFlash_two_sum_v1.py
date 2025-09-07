from typing import List


class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        complement_map = {}
        for i, val in enumerate(nums):
            complement = target - val
            if complement in complement_map:
                return [complement_map[complement], i]
            complement_map[val] = i
        return [-1, -1]  # This case isn't expected