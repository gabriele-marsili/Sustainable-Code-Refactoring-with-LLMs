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
            if i < len(nums) and nums[i] == nums[i - 1] + 1:
                continue
            if start == nums[i - 1]:
                res.append(str(start))
            else:
                res.append(f"{start}->{nums[i - 1]}")
            if i < len(nums):
                start = nums[i]

        return res