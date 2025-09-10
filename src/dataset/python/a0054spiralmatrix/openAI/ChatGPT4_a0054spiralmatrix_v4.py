# -*- coding: utf-8 -*-
from typing import List

class Solution:
    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
        if not matrix or not matrix[0]:
            return []
        
        ret = []
        top, bottom, left, right = 0, len(matrix) - 1, 0, len(matrix[0]) - 1
        
        while top <= bottom and left <= right:
            ret.extend(matrix[top][left:right + 1])
            top += 1
            for i in range(top, bottom + 1):
                ret.append(matrix[i][right])
            right -= 1
            if top <= bottom:
                ret.extend(matrix[bottom][right:left - 1:-1])
                bottom -= 1
            if left <= right:
                for i in range(bottom, top - 1, -1):
                    ret.append(matrix[i][left])
                left += 1
        
        return ret