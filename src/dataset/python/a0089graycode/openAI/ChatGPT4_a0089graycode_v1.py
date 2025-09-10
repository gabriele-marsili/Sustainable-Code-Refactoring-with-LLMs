# -*- coding: utf-8 -*-
from typing import List

class Solution:
    def grayCode(self, n: int) -> List[int]:
        result = [0]
        for i in range(n):
            tag = 1 << i
            result.extend(num | tag for num in reversed(result))
        return result