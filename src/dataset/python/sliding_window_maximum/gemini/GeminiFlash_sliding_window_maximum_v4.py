from collections import deque
from typing import List


class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        n = len(nums)
        if n == 0 or k == 0:
            return []

        if k == 1:
            return nums

        dq = deque()
        res = []

        for i in range(n):
            # Remove elements out of the window
            if dq and dq[0] == i - k:
                dq.popleft()

            # Remove smaller elements in deque than current element
            while dq and nums[dq[-1]] < nums[i]:
                dq.pop()

            dq.append(i)

            # Add to result when window has reached size k
            if i >= k - 1:
                res.append(nums[dq[0]])

        return res