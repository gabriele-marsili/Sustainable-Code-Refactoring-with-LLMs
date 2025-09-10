def search_range(nums, target):
    def binary_search(nums, target, find_left):
        low = 0
        high = len(nums)
        while low < high:
            mid = (low + high) // 2
            if nums[mid] > target or (find_left and nums[mid] == target):
                high = mid
            else:
                low = mid + 1
        return low

    left_idx = binary_search(nums, target, True)

    if left_idx == len(nums) or nums[left_idx] != target:
        return [-1, -1]

    right_idx = binary_search(nums, target, False) - 1

    return [left_idx, right_idx]