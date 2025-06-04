def missing_number(nums):
    s = sum(nums)
    n = len(nums) + 1
    return n * (n + 1) // 2 - s