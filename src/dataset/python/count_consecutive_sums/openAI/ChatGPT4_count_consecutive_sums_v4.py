def count_consecutive_sums(n):
    count = 0
    for start in range(1, int((2 * n) ** 0.5) + 1):
        if (n - start * (start - 1) // 2) % start == 0:
            count += 1
    return count