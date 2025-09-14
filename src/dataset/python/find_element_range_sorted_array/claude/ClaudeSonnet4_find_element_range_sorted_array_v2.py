def search_range(nums, target):
    if not nums:
        return [-1, -1]
    
    # Find leftmost position
    left, right = 0, len(nums) - 1
    left_idx = -1
    while left <= right:
        mid = (left + right) >> 1
        if nums[mid] == target:
            left_idx = mid
            right = mid - 1
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    if left_idx == -1:
        return [-1, -1]
    
    # Find rightmost position
    left, right = 0, len(nums) - 1
    right_idx = -1
    while left <= right:
        mid = (left + right) >> 1
        if nums[mid] == target:
            right_idx = mid
            left = mid + 1
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return [left_idx, right_idx]