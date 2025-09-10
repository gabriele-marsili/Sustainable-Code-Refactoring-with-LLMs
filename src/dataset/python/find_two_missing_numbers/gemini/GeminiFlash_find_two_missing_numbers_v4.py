def missing_numbers(nums):
    n = len(nums) + 2
    sum_nums = sum(nums)
    sum_sq_nums = sum(x * x for x in nums)

    expected_sum = n * (n + 1) // 2
    expected_sum_sq = n * (n + 1) * (2 * n + 1) // 6

    diff_sum = expected_sum - sum_nums
    diff_sum_sq = expected_sum_sq - sum_sq_nums

    diff = int((diff_sum_sq - diff_sum * diff_sum) ** 0.5)
    a = (diff_sum - diff) // 2
    b = (diff_sum + diff) // 2
    return [a, b]