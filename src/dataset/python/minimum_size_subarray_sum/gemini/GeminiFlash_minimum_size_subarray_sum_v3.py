class Solution(object):
    def minSubArrayLen(self, target, nums):
        """
        :type target: int
        :type nums: List[int]
        :rtype: int
        """
        if not nums:
            return 0

        n = len(nums)
        min_len = float('inf')
        window_start = 0
        window_sum = 0

        for window_end in range(n):
            window_sum += nums[window_end]

            while window_sum >= target:
                min_len = min(min_len, window_end - window_start + 1)
                window_sum -= nums[window_start]
                window_start += 1

        return 0 if min_len == float('inf') else min_len