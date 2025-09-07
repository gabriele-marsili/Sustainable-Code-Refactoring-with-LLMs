class Solution(object):
    def summaryRanges(self, nums):
        """
        :type nums: List[int]
        :rtype: List[str]
        """
        if not nums:
            return []

        res = []
        start = nums[0]

        for i in range(1, len(nums) + 1):
            if i == len(nums) or nums[i] != nums[i - 1] + 1:
                res.append(f"{start}->{nums[i - 1]}" if start != nums[i - 1] else str(start))
                if i < len(nums):
                    start = nums[i]

        return res