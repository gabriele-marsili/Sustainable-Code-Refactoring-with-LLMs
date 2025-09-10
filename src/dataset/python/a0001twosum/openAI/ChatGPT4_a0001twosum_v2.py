from typing import List

class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        dic = {}
        for index, num in enumerate(nums):
            pair = target - num
            if pair in dic:
                return [dic[pair], index]
            dic[num] = index