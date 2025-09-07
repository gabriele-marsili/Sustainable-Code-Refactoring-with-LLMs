class Solution(object):
    def summaryRanges(self, nums):
        """
        :type nums: List[int]
        :rtype: List[str]
        """
        n = len(nums)
        if not nums:
            return []

        result = []
        start = nums[0]

        for i in range(1, n + 1):
            if i < n and nums[i] == nums[i - 1] + 1:
                continue
            elif start == nums[i - 1]:
                result.append(str(start))
            else:
                result.append(str(start) + "->" + str(nums[i - 1]))

            if i < n:
                start = nums[i]

        return result