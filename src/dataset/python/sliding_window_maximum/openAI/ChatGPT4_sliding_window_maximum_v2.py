from collections import deque
from typing import List


class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        if not nums or k == 0:
            return []

        dq = deque()
        res = []
        append_res = res.append
        append_dq = dq.append
        pop_dq = dq.pop
        popleft_dq = dq.popleft

        for i, num in enumerate(nums):
            if dq and dq[0] == i - k:
                popleft_dq()
            while dq and nums[dq[-1]] <= num:
                pop_dq()
            append_dq(i)
            if i >= k - 1:
                append_res(nums[dq[0]])

        return res