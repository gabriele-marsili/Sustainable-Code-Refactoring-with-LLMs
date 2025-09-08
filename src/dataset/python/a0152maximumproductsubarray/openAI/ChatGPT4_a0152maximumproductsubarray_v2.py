from typing import List

class Solution:
  def maxProduct(self, nums: List[int]) -> int:
    result = iMax = iMin = nums[0]
    for num in nums[1:]:
      if num < 0:
        iMax, iMin = iMin, iMax
      iMax = max(num, iMax * num)
      iMin = min(num, iMin * num)
      result = max(result, iMax)
    return result