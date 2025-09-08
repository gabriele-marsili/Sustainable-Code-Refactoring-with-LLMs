def product_except_self(nums):
    n = len(nums)
    if n == 0:
        return []

    res = [1] * n

    # Calculate left products
    left_product = 1
    for i in range(n):
        res[i] = left_product
        left_product *= nums[i]

    # Calculate right products and combine
    right_product = 1
    for i in range(n - 1, -1, -1):
        res[i] *= right_product
        right_product *= nums[i]

    return res