def missing_numbers(nums):
    n = len(nums) + 2
    sum_nums = sum(nums)
    sum_sq_nums = sum(x * x for x in nums)

    expected_sum = n * (n + 1) // 2
    expected_sum_sq = n * (n + 1) * (2 * n + 1) // 6

    diff_sum = expected_sum - sum_nums
    diff_sum_sq = expected_sum_sq - sum_sq_nums

    sum_missing = diff_sum
    prod_missing = (diff_sum * diff_sum - diff_sum_sq) // -2

    a = (sum_missing - int((sum_missing * sum_missing - 4 * prod_missing)**0.5)) // 2
    b = sum_missing - a

    return sorted([a, b])