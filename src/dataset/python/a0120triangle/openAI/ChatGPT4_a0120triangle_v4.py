# -*- coding: utf-8 -*-
from typing import List

class Solution:
    def minimumTotal(self, triangle: List[List[int]]) -> int:
        prev_row = triangle[0]
        for i in range(1, len(triangle)):
            curr_row = triangle[i]
            curr_row[0] += prev_row[0]
            for j in range(1, len(curr_row) - 1):
                curr_row[j] += min(prev_row[j - 1], prev_row[j])
            curr_row[-1] += prev_row[-1]
            prev_row = curr_row
        return min(prev_row)