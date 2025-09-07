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
        
        for i in range(1, len(nums)):
            if nums[i] != nums[i-1] + 1:
                if nums[i-1] == start:
                    res.append(str(start))
                else:
                    res.append(str(start) + "->" + str(nums[i-1]))
                start = nums[i]
        
        if nums[-1] == start:
            res.append(str(start))
        else:
            res.append(str(start) + "->" + str(nums[-1]))
        
        return res