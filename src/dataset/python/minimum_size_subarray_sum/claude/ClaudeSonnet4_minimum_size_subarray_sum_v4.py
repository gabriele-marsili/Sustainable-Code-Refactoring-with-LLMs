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
        left = 0
        min_len = n + 1
        sub_sum = 0
        
        for right in range(n):
            sub_sum += nums[right]
            
            while sub_sum >= target:
                min_len = min(min_len, right - left + 1)
                sub_sum -= nums[left]
                left += 1
        
        return min_len if min_len <= n else 0