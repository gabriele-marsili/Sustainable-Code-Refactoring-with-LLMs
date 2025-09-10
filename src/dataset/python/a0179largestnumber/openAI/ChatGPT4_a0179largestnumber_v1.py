# -*- coding: utf-8 -*-
from typing import List


class Solution:

    def largestNumber(self, nums: List[int]) -> str:
        nums = sorted(map(str, nums), key=lambda x: x * 10, reverse=True)
        return ''.join(nums).lstrip('0') or '0'