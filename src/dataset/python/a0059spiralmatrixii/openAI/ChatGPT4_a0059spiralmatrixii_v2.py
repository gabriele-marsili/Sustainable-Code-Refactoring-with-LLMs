from typing import List

class Solution:
    def generateMatrix(self, n: int) -> List[List[int]]:
        matrix = [[0] * n for _ in range(n)]
        num, left, right, top, bottom = 1, 0, n - 1, 0, n - 1

        while left <= right and top <= bottom:
            for col in range(left, right + 1):  # Traverse from left to right
                matrix[top][col] = num
                num += 1
            top += 1

            for row in range(top, bottom + 1):  # Traverse from top to bottom
                matrix[row][right] = num
                num += 1
            right -= 1

            if top <= bottom:  # Traverse from right to left
                for col in range(right, left - 1, -1):
                    matrix[bottom][col] = num
                    num += 1
                bottom -= 1

            if left <= right:  # Traverse from bottom to top
                for row in range(bottom, top - 1, -1):
                    matrix[row][left] = num
                    num += 1
                left += 1

        return matrix