def missing_numbers(nums):
    n = len(nums) + 2
    expected_sum = n * (n + 1) >> 1
    expected_sum_squares = n * (n + 1) * (2 * n + 1) // 6
    
    actual_sum = sum(nums)
    actual_sum_squares = sum(i * i for i in nums)
    
    sum_diff = expected_sum - actual_sum
    sum_squares_diff = expected_sum_squares - actual_sum_squares
    
    product_diff = (sum_squares_diff - sum_diff * sum_diff) >> 1
    sqrt_val = int(product_diff ** 0.5)
    
    a = (sum_diff - sqrt_val) >> 1
    b = (sum_diff + sqrt_val) >> 1
    
    return [a, b]