# -*- coding: utf-8 -*-
from typing import List


class Solution:
    def combinationSum3(self, k: int, n: int) -> List[List[int]]:
        def backtrack(start, k, n, path, result):
            if k == 0 and n == 0:
                result.append(path[:])
                return
            if k == 0 or n < 0:
                return
            for i in range(start, 10):
                if n < i:  # Early termination
                    break
                path.append(i)
                backtrack(i + 1, k - 1, n - i, path, result)
                path.pop()

        result = []
        backtrack(1, k, n, [], result)
        return result