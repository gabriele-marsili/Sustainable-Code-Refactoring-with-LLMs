def find_peak_element(nums):
    l, r = 0, len(nums) - 1
    while l < r:
        mid = (l + r) >> 1
        r = mid if nums[mid] > nums[mid + 1] else mid + 1
    return l