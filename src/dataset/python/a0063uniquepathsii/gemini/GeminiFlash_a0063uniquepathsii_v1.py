from typing import List


class Solution:
  def uniquePathsWithObstacles(self, obstacleGrid: List[List[int]]) -> int:
    m = len(obstacleGrid)
    if m == 0:
      return 0
    n = len(obstacleGrid[0])
    if n == 0:
      return 0

    dp = [0] * n
    dp[0] = 1 if obstacleGrid[0][0] == 0 else 0

    for i in range(m):
      for j in range(n):
        if obstacleGrid[i][j] == 1:
          dp[j] = 0
        else:
          if j > 0:
            dp[j] += dp[j - 1]

    return dp[-1]