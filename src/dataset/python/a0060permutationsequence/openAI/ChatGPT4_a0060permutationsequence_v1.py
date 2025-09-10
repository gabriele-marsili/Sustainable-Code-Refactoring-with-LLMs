# -*- coding: utf-8 -*-

class Solution:

  def getPermutation(self, n: int, k: int) -> str:
    from math import factorial

    numbers = list(range(1, n + 1))
    result = []
    k -= 1

    for i in range(n, 0, -1):
      fact = factorial(i - 1)
      index, k = divmod(k, fact)
      result.append(numbers.pop(index))

    return ''.join(map(str, result))