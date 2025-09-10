def missing_numbers(nums):
    s, s_2 = sum(nums), sum(i * i for i in nums)
    n = len(nums) + 2
    f_s = n * (n + 1) // 2
    f_s_2 = n * (n + 1) * (2 * n + 1) // 6
    d = f_s - s
    d_2 = f_s_2 - s_2
    r = int((2 * d_2 - d * d) ** 0.5)
    a, b = (d - r) // 2, (d + r) // 2
    return [a, b]