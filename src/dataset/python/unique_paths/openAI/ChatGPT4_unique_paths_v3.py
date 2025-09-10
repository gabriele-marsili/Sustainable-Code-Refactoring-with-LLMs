def unique_paths_dp(n, m):
    prev_row = [1] * m
    for _ in range(1, n):
        for j in range(1, m):
            prev_row[j] += prev_row[j - 1]
    return prev_row[-1]

def unique_paths(n, m):
    m, n = min(m, n), max(m, n)
    comb = 1
    for i in range(1, m):
        comb = comb * (n + i - 1) // i
    return comb