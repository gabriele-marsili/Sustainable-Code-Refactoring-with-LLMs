from typing import List

class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        if not matrix or not matrix[0]:
            return False

        rows, cols = len(matrix), len(matrix[0])
        low, high = 0, rows * cols - 1

        while low <= high:
            mid = (low + high) >> 1
            value = matrix[mid // cols][mid % cols]
            if value == target:
                return True
            elif value > target:
                high = mid - 1
            else:
                low = mid + 1

        return False