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
        
        for i in range(1, len(nums)):
            if nums[i] != nums[i-1] + 1:
                if start == i - 1:
                    res.append(str(nums[start]))
                else:
                    res.append(str(nums[start]) + "->" + str(nums[i-1]))
                start = i
        
        # Handle the last range
        if start == len(nums) - 1:
            res.append(str(nums[start]))
        else:
            res.append(str(nums[start]) + "->" + str(nums[-1]))
        
        return res