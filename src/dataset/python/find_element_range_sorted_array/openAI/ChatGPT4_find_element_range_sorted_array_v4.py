def search_range(nums, target):
    def binary_search(nums, target, find_first):
        left, right = 0, len(nums) - 1
        result = -1
        while left <= right:
            mid = (left + right) // 2
            if nums[mid] == target:
                result = mid
                if find_first:
                    right = mid - 1
                else:
                    left = mid + 1
            elif nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        return result

    left_idx = binary_search(nums, target, True)
    if left_idx == -1:
        return [-1, -1]
    right_idx = binary_search(nums, target, False)
    return [left_idx, right_idx]