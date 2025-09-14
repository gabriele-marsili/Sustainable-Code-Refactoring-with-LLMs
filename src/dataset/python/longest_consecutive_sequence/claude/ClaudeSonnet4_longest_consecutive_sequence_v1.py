from typing import List


class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        if not nums:
            return 0
        
        num_set = set(nums)
        longest_streak = 1

        for num in num_set:
            if num - 1 not in num_set:
                current_streak = 1
                current_num = num

                while current_num + 1 in num_set:
                    current_num += 1
                    current_streak += 1

                if current_streak > longest_streak:
                    longest_streak = current_streak

        return longest_streak