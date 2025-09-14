from typing import List


class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        n = len(nums)
        res = []

        for i in range(n - 2):
            # Skip positive numbers if the smallest number is already positive
            if nums[i] > 0:
                break

            # Skip duplicate elements for the first number
            if i > 0 and nums[i] == nums[i - 1]:
                continue

            left, right = i + 1, n - 1

            while left < right:
                three_sum = nums[i] + nums[left] + nums[right]

                if three_sum == 0:
                    res.append([nums[i], nums[left], nums[right]])

                    # Skip duplicate elements for the second number
                    left += 1
                    while left < right and nums[left] == nums[left - 1]:
                        left += 1

                    # Skip duplicate elements for the third number
                    right -= 1
                    while left < right and nums[right] == nums[right + 1]:
                        right -= 1

                elif three_sum < 0:
                    left += 1
                else:
                    right -= 1

        return res