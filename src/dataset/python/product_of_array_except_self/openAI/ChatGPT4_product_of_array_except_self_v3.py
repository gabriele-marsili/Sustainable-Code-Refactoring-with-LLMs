def product_except_self(nums):
    n = len(nums)
    if n == 0:
        return []

    res = [1] * n
    left = 1
    right = 1

    for i in range(n):
        res[i] *= left
        left *= nums[i]
        res[n - 1 - i] *= right
        right *= nums[n - 1 - i]

    return res