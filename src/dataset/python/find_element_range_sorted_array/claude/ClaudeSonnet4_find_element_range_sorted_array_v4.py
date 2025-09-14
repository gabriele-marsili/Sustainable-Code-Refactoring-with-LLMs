def search_range(nums, target):
    if not nums:
        return [-1, -1]
    
    left = 0
    right = len(nums) - 1
    
    # Find leftmost position
    left_bound = -1
    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            left_bound = mid
            right = mid - 1
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    if left_bound == -1:
        return [-1, -1]
    
    # Find rightmost position
    left = left_bound
    right = len(nums) - 1
    right_bound = left_bound
    
    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            right_bound = mid
            left = mid + 1
        else:
            right = mid - 1
    
    return [left_bound, right_bound]

def binary_search(nums, target, equal=True):
    left = 0
    right = len(nums)
    while left < right:
        mid = left + (right - left) // 2
        if (nums[mid] > target) or (equal and nums[mid] == target):
            right = mid
        else:
            left = mid + 1
    return left