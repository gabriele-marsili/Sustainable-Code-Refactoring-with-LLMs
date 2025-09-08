class Solution(object):
    def minSubArrayLen(self, target, nums):
        """
        :type target: int
        :type nums: List[int]
        :rtype: int
        """
        n = len(nums)
        if n == 0:
            return 0

        min_len = float('inf')
        window_sum = 0
        window_start = 0

        for window_end in range(n):
            window_sum += nums[window_end]

            while window_sum >= target:
                min_len = min(min_len, window_end - window_start + 1)
                window_sum -= nums[window_start]
                window_start += 1

        return min_len if min_len != float('inf') else 0