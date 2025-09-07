class Solution(object):
    def summaryRanges(self, nums):
        """
        :type nums: List[int]
        :rtype: List[str]
        """
        n = len(nums)
        if n == 0:
            return []

        result = []
        start = nums[0]
        end = nums[0]

        for i in range(1, n):
            if nums[i] == end + 1:
                end = nums[i]
            else:
                if start == end:
                    result.append(str(start))
                else:
                    result.append(str(start) + "->" + str(end))
                start = nums[i]
                end = nums[i]

        if start == end:
            result.append(str(start))
        else:
            result.append(str(start) + "->" + str(end))

        return result