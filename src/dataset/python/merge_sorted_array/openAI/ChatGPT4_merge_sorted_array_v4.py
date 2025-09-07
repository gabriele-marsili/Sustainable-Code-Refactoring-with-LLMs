class Solution(object):
    def merge(self, nums1, m, nums2, n):
        i, j, k = m - 1, n - 1, m + n - 1
        while j >= 0:
            nums1[k] = nums1[i] if i >= 0 and nums1[i] > nums2[j] else nums2[j]
            i, j = (i - 1, j) if nums1[k] == nums1[i] else (i, j - 1)
            k -= 1