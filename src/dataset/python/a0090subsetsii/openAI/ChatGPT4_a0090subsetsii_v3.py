from typing import List


class Solution:
    def subsetsWithDup(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        result = [[]]
        prev_size = 0

        for i in range(len(nums)):
            start = prev_size if i > 0 and nums[i] == nums[i - 1] else 0
            prev_size = len(result)
            result += [result[j] + [nums[i]] for j in range(start, prev_size)]

        return result