def search_range(nums, target):
    if not nums:
        return [-1, -1]
    
    left_idx = binary_search_left(nums, target)
    if left_idx == len(nums) or nums[left_idx] != target:
        return [-1, -1]
    
    right_idx = binary_search_right(nums, target)
    return [left_idx, right_idx]

def binary_search(nums, target, equal=True):
    if equal:
        return binary_search_left(nums, target)
    else:
        return binary_search_right(nums, target) + 1

def binary_search_left(nums, target):
    left, right = 0, len(nums)
    while left < right:
        mid = left + ((right - left) >> 1)
        if nums[mid] >= target:
            right = mid
        else:
            left = mid + 1
    return left

def binary_search_right(nums, target):
    left, right = 0, len(nums)
    while left < right:
        mid = left + ((right - left) >> 1)
        if nums[mid] > target:
            right = mid
        else:
            left = mid + 1
    return left - 1