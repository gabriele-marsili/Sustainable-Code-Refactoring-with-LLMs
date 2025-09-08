def product_except_self(nums):
    n = len(nums)
    if n == 0:
        return []

    res = [1] * n
    
    # Forward pass: store products of elements to the left
    for i in range(1, n):
        res[i] = res[i - 1] * nums[i - 1]
    
    # Backward pass: multiply with products of elements to the right
    right_product = 1
    for i in range(n - 1, -1, -1):
        res[i] *= right_product
        right_product *= nums[i]
    
    return res