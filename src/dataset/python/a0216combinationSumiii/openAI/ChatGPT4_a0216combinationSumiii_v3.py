# -*- coding: utf-8 -*-
from typing import List

class Solution:
    def combinationSum3(self, k: int, n: int) -> List[List[int]]:
        return self.helper(k, n, 9)

    def helper(self, k: int, n: int, maxNum: int) -> List[List[int]]:
        if k > maxNum or n < k * (k + 1) // 2 or n > k * (2 * maxNum - k + 1) // 2:
            return []

        if k == 1:
            return [[n]] if 1 <= n <= maxNum else []

        result = []
        for _max in range(maxNum, k - 1, -1):
            if n - _max < (k - 1) * k // 2:
                continue
            result.extend([arr + [_max] for arr in self.helper(k - 1, n - _max, _max - 1)])

        return result