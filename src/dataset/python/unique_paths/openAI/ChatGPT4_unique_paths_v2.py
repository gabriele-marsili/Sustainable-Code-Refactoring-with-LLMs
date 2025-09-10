def unique_paths_dp(n, m):
    # Use a single array to save space
    dp = [1] * m

    for i in range(1, n):
        for j in range(1, m):
            dp[j] += dp[j - 1]

    return dp[-1]

def unique_paths(n, m):
    from math import comb
    return comb(n + m - 2, min(m - 1, n - 1))