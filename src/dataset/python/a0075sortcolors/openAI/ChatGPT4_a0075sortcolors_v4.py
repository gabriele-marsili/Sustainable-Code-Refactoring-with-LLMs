# -*- coding: utf-8 -*-
from typing import List

class Solution:
    def sortColors(self, nums: List[int]) -> None:
        zero, one, two = 0, 0, len(nums) - 1
        while one <= two:
            if nums[one] == 0:
                if zero != one:
                    nums[zero], nums[one] = nums[one], nums[zero]
                zero += 1
                one += 1
            elif nums[one] == 1:
                one += 1
            else:
                if one != two:
                    nums[one], nums[two] = nums[two], nums[one]
                two -= 1