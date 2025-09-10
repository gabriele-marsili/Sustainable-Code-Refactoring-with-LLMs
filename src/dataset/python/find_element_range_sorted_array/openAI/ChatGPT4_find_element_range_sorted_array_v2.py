def search_range(nums, target):
    left_idx = binary_search(nums, target, True)
    if left_idx == len(nums) or nums[left_idx] != target:
        return [-1, -1]
    return [left_idx, binary_search(nums, target, False) - 1]

def binary_search(nums, target, find_first):
    left, right = 0, len(nums) - 1
    result = len(nums) if find_first else -1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] > target or (find_first and nums[mid] == target):
            right = mid - 1
            if find_first:
                result = mid
        else:
            left = mid + 1
            if not find_first:
                result = mid + 1
    return result