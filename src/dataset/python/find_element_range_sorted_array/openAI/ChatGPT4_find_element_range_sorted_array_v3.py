def search_range(nums, target):
    def binary_search(left, right, equal):
        while left < right:
            mid = (left + right) >> 1
            if nums[mid] > target or (equal and nums[mid] == target):
                right = mid
            else:
                left = mid + 1
        return left

    left_idx = binary_search(0, len(nums), True)
    if left_idx == len(nums) or nums[left_idx] != target:
        return [-1, -1]
    right_idx = binary_search(0, len(nums), False) - 1
    return [left_idx, right_idx]