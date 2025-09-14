def missing_number(nums):
    n = len(nums)
    expected_sum = (n + 1) * (n + 2) // 2
    return expected_sum - sum(nums)