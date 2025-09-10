from typing import List

class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        if not matrix or not matrix[0]:
            return False

        m, n = len(matrix), len(matrix[0])
        low, up = 0, m * n - 1

        while low <= up:
            middle = (low + up) >> 1
            val = matrix[middle // n][middle % n]
            if val == target:
                return True
            if val > target:
                up = middle - 1
            else:
                low = middle + 1

        return False