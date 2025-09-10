class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        prev_row = [1] * m
        for _ in range(1, n):
            for j in range(1, m):
                prev_row[j] += prev_row[j - 1]
        return prev_row[-1]