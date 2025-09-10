from collections import deque
from typing import List


class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        if not nums:
            return []
        
        n = len(nums)
        if k > n or k <= 0:
            return []

        dq = deque()
        res = []

        for i in range(n):
            # Remove elements out of the window
            if dq and dq[0] == i - k:
                dq.popleft()

            # Remove smaller elements in deque than current element
            while dq and nums[i] >= nums[dq[-1]]:
                dq.pop()

            dq.append(i)

            # Add max to results once window size is reached
            if i >= k - 1:
                res.append(nums[dq[0]])

        return res