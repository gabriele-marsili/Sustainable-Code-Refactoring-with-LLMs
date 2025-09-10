def count_divisibles_in_range(start, end, n):
    start = (start + n - 1) // n * n
    return max(0, (end - start) // n + 1)