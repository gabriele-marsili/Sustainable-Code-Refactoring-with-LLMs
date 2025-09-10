def count_consecutive_sums(n):
    count = 0
    for k in range(1, int((2 * n) ** 0.5) + 1):
        if (n - k * (k - 1) // 2) % k == 0:
            count += 1
    return count