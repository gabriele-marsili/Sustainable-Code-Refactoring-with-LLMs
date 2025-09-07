def odd_sum(a, b):
    a += a % 2 == 0
    b -= b % 2 == 0
    n = (b - a) // 2 + 1
    return n * (a + b) // 2