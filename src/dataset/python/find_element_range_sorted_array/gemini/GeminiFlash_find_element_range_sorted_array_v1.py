def search_range(nums, target):
    def binary_search_left(nums, target):
        left, right = 0, len(nums) - 1
        while left <= right:
            mid = (left + right) // 2
            if nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        return left

    def binary_search_right(nums, target):
        left, right = 0, len(nums) - 1
        while left <= right:
            mid = (left + right) // 2
            if nums[mid] > target:
                right = mid - 1
            else:
                left = mid + 1
        return right

    left_idx = binary_search_left(nums, target)

    if left_idx >= len(nums) or nums[left_idx] != target:
        return [-1, -1]

    right_idx = binary_search_right(nums, target)

    return [left_idx, right_idx]