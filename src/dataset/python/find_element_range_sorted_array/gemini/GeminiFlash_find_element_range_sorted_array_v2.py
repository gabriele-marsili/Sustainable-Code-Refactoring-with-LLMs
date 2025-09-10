def search_range(nums, target):
    def binary_search_left(nums, target):
        left, right = 0, len(nums)
        while left < right:
            mid = (left + right) // 2
            if nums[mid] < target:
                left = mid + 1
            else:
                right = mid
        return left

    def binary_search_right(nums, target):
        left, right = 0, len(nums)
        while left < right:
            mid = (left + right) // 2
            if nums[mid] <= target:
                left = mid + 1
            else:
                right = mid
        return left

    left_idx = binary_search_left(nums, target)

    if left_idx == len(nums) or nums[left_idx] != target:
        return [-1, -1]

    right_idx = binary_search_right(nums, target) - 1

    return [left_idx, right_idx]