class Solution(object):
    def summaryRanges(self, nums):
        """
        :type nums: List[int]
        :rtype: List[str]
        """
        if not nums:
            return []

        res = []
        start = 0
        
        for end in range(len(nums)):
            if end == len(nums) - 1 or nums[end] + 1 != nums[end + 1]:
                if start == end:
                    res.append(str(nums[start]))
                else:
                    res.append(str(nums[start]) + "->" + str(nums[end]))
                start = end + 1
        
        return res