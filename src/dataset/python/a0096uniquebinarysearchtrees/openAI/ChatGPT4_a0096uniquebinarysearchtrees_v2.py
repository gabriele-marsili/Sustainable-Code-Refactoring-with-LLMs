class Solution:
    def numTrees(self, n: int) -> int:
        result = [1] * (n + 1)
        for i in range(2, n + 1):
            result[i] = sum(result[j] * result[i - 1 - j] for j in range(i))
        return result[n]