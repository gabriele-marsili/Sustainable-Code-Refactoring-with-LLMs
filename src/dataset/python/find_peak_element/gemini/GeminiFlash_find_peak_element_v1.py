def find_peak_element(nums):
    l, r = 0, len(nums) - 1
    while l < r:
        mid = (l + r) >> 1  # Bitwise right shift for faster division by 2
        if nums[mid] > nums[mid + 1]:
            r = mid
        else:
            l = mid + 1
    return l