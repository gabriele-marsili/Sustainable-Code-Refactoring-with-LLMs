from collections import deque
from typing import List


class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        dq = deque()
        res = []
        append_res = res.append
        dq_append = dq.append
        dq_pop = dq.pop
        dq_popleft = dq.popleft

        for i, num in enumerate(nums):
            if dq and dq[0] == i - k:
                dq_popleft()
            while dq and nums[dq[-1]] <= num:
                dq_pop()
            dq_append(i)
            if i >= k - 1:
                append_res(nums[dq[0]])

        return res