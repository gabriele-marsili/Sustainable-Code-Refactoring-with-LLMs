from collections import deque
from typing import List


class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        if not nums or k <= 0:
            return []
        
        if k == 1:
            return nums
        
        if k >= len(nums):
            return [max(nums)]
        
        dq = deque()
        res = []
        
        for i in range(len(nums)):
            while dq and dq[0] <= i - k:
                dq.popleft()
            
            while dq and nums[i] >= nums[dq[-1]]:
                dq.pop()
            
            dq.append(i)
            
            if i >= k - 1:
                res.append(nums[dq[0]])
        
        return res