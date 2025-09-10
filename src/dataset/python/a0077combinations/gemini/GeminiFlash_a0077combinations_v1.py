from typing import List


class Solution:
  def combine(self, n: int, k: int) -> List[List[int]]:
    if k == 0:
      return [[]]
    if k > n:
      return []

    result = []

    def backtrack(start, combination):
      if len(combination) == k:
        result.append(combination.copy())  # Append a copy to avoid modification
        return

      for i in range(start, n + 1):
        combination.append(i)
        backtrack(i + 1, combination)
        combination.pop()  # Backtrack: remove the last element

    backtrack(1, [])
    return result