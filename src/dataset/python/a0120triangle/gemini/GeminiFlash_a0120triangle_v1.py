from typing import List


class Solution:
  def minimumTotal(self, triangle: List[List[int]]) -> int:
    n = len(triangle)
    dp = triangle[-1]  # Initialize dp with the last row of the triangle

    for i in range(n - 2, -1, -1):
      for j in range(i + 1):
        dp[j] = triangle[i][j] + min(dp[j], dp[j + 1])

    return dp[0]