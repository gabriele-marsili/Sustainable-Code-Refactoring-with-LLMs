def search_range(nums, target):
    left_idx = binary_search(nums, target, True)
    if (left_idx == len(nums)) or (nums[left_idx] != target):
        return [-1, -1]
    right_idx = binary_search(nums, target, False) - 1
    return [left_idx, right_idx]
def binary_search(nums, target, equal=True):
    left = 0
    right = len(nums)
    while left < right:
        mid = (left + right) // 2
        if (nums[mid] > target) or (equal and nums[mid] == target):
            right = mid
        else:
            left = mid + 1
    return left