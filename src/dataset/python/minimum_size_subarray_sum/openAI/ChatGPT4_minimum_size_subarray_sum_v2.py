class Solution(object):
    def minSubArrayLen(self, target, nums):
        """
        :type target: int
        :type nums: List[int]
        :rtype: int
        """
        n = len(nums)
        left = 0
        min_len = float("inf")
        sub_sum = 0

        for right in range(n):
            sub_sum += nums[right]
            while sub_sum >= target:
                min_len = min(min_len, right - left + 1)
                sub_sum -= nums[left]
                left += 1

        return 0 if min_len == float("inf") else min_len