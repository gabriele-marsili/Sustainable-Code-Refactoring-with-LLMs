# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/kth-largest-element-in-an-array/
#
# DESC:
# =====
# Find the kth largest element in an unsorted array.
# Note that it is the kth largest element in the sorted order, not the kth distinct element.
#
# Example 1:
#
# Input: [3,2,1,5,6,4] and k = 2
# Output: 5
# Example 2:
#
# Input: [3,2,3,1,2,4,5,5,6] and k = 4
# Output: 4
# Note:
# You may assume k is always valid, 1 ≤ k ≤ array's length.
################################################
from typing import List
import heapq
import random


class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        if k == 1:
            return max(nums)
        
        if k <= len(nums) // 2:
            return heapq.nlargest(k, nums)[-1]
        else:
            return self._quickselect(nums, 0, len(nums) - 1, len(nums) - k)
    
    def _quickselect(self, nums: List[int], left: int, right: int, k_smallest: int) -> int:
        if left == right:
            return nums[left]
        
        pivot_index = self._partition(nums, left, right)
        
        if k_smallest == pivot_index:
            return nums[k_smallest]
        elif k_smallest < pivot_index:
            return self._quickselect(nums, left, pivot_index - 1, k_smallest)
        else:
            return self._quickselect(nums, pivot_index + 1, right, k_smallest)
    
    def _partition(self, nums: List[int], left: int, right: int) -> int:
        pivot_index = random.randint(left, right)
        nums[pivot_index], nums[right] = nums[right], nums[pivot_index]
        
        pivot = nums[right]
        i = left
        
        for j in range(left, right):
            if nums[j] <= pivot:
                nums[i], nums[j] = nums[j], nums[i]
                i += 1
        
        nums[i], nums[right] = nums[right], nums[i]
        return i