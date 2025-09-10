def search_range(nums, target):
    left_idx = binary_search(nums, target, True)
    if left_idx == len(nums) or nums[left_idx] != target:
        return [-1, -1]
    return [left_idx, binary_search(nums, target, False) - 1]

def binary_search(nums, target, equal=True):
    left, right = 0, len(nums)
    while left < right:
        mid = left + (right - left) // 2
        if nums[mid] > target or (equal and nums[mid] == target):
            right = mid
        else:
            left = mid + 1
    return left