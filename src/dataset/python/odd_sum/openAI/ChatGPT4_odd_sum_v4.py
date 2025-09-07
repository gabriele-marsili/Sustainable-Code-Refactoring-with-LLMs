def odd_sum(a, b):
    a |= 1  # Ensure 'a' is odd
    b &= ~1  # Ensure 'b' is even
    n = (b - a) // 2 + 1  # Count of odd numbers
    return n * (a + n - 1)