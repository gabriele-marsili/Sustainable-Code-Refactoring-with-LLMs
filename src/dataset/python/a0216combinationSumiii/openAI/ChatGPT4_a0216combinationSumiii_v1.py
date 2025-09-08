# -*- coding: utf-8 -*-

from typing import List


class Solution:
    def combinationSum3(self, k: int, n: int) -> List[List[int]]:
        result = []
        self.helper(k, n, 9, [], result)
        return result

    def helper(self, k, n, maxNum, path, result):
        if k == 0 and n == 0:
            result.append(path)
            return
        if k == 0 or n <= 0:
            return

        for num in range(maxNum, 0, -1):
            if num > n:
                continue
            self.helper(k - 1, n - num, num - 1, path + [num], result)