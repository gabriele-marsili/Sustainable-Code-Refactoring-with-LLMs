def product_except_self(nums):
    n = len(nums)
    if n == 0:
        return []
    
    res = [1] * n
    
    for i in range(1, n):
        res[i] = res[i - 1] * nums[i - 1]
    
    right_product = 1
    for i in range(n - 1, -1, -1):
        res[i] *= right_product
        right_product *= nums[i]
    
    return res