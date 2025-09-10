def unique_paths_dp(n, m):
    prev_row = [1] * m

    for _ in range(1, n):
        for j in range(1, m):
            prev_row[j] += prev_row[j - 1]

    return prev_row[-1]

def unique_paths(n, m):
    from math import comb
    return comb(n + m - 2, min(n - 1, m - 1))