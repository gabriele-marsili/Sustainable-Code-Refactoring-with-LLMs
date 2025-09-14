from collections import deque
from typing import List


class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        if not nums or k == 0:
            return []
        if k == 1:
            return nums
        if k >= len(nums):
            return [max(nums)]
        
        dq = deque()
        res = []
        
        # Process first window
        for i in range(k):
            while dq and nums[i] >= nums[dq[-1]]:
                dq.pop()
            dq.append(i)
        
        res.append(nums[dq[0]])
        
        # Process remaining elements
        for i in range(k, len(nums)):
            # Remove elements outside current window
            if dq and dq[0] <= i - k:
                dq.popleft()
            
            # Remove elements smaller than current
            while dq and nums[i] >= nums[dq[-1]]:
                dq.pop()
            
            dq.append(i)
            res.append(nums[dq[0]])
        
        return res