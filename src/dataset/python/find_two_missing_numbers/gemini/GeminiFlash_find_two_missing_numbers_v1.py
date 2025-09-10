def missing_numbers(nums):
    n = len(nums) + 2
    total_sum = n * (n + 1) // 2
    total_sum_sq = n * (n + 1) * (2 * n + 1) // 6

    actual_sum = sum(nums)
    actual_sum_sq = sum(x * x for x in nums)

    diff_sum = total_sum - actual_sum
    diff_sum_sq = total_sum_sq - actual_sum_sq

    diff = int((diff_sum_sq - diff_sum * diff_sum) ** 0.5)
    
    a = (diff_sum - diff) // 2
    b = (diff_sum + diff) // 2
    
    return [a, b]