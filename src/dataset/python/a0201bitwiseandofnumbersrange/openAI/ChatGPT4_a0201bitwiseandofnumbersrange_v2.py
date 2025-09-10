class Solution:
  def rangeBitwiseAnd(self, m: int, n: int) -> int:
    shift = 0
    while m < n:
      n &= (n - 1)
    return n << shift