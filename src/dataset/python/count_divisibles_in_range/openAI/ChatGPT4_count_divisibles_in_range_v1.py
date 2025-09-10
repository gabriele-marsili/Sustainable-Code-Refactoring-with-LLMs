def count_divisibles_in_range(start, end, n):
    if start % n:
        start += n - (start % n)

    return max(0, (end - start) // n + 1)