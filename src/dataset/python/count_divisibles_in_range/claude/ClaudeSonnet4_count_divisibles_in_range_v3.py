def count_divisibles_in_range(start, end, n):
    if n <= 0:
        return 0
    
    first_divisible = start + (n - start % n) % n
    
    if first_divisible > end:
        return 0
    
    return (end - first_divisible) // n + 1