def odd_sum(a, b):
    a += a % 2 == 0
    b += b % 2 == 1
    n = (b - a + 1) >> 1
    return n * (a + n - 1)