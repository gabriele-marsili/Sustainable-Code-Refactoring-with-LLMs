def missing_numbers(nums):
    n = len(nums) + 2
    s = n * (n + 1) // 2
    s_2 = n * (n + 1) * (2 * n + 1) // 6
    
    for i in nums:
        s -= i
        s_2 -= i * i
    
    r = int((2 * s_2 - s * s) ** 0.5)
    a = (s - r) // 2
    b = (s + r) // 2
    return [a, b]