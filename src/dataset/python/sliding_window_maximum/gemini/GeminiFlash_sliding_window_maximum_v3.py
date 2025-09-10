from collections import deque
from typing import List


class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        n = len(nums)
        if n * k == 0:
            return []
        if k == 1:
            return nums

        dq = deque()
        res = []

        for i in range(n):
            while dq and nums[dq[-1]] < nums[i]:
                dq.pop()
            dq.append(i)

            if i >= k - 1:
                res.append(nums[dq[0]])
                if dq[0] == i - k + 1:
                    dq.popleft()

        return res