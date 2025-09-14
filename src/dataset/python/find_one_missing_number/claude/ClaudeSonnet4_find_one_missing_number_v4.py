def missing_number(nums):
    n = len(nums)
    expected_sum = (n + 1) * (n + 2) >> 1
    actual_sum = 0
    for num in nums:
        actual_sum += num
    return expected_sum - actual_sum