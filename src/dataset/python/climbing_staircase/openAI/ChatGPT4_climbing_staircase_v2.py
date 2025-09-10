def climbing_staircase(steps, height):
    dp = [0] * (height + 1)
    dp[0] = 1  # Base case: one way to climb 0 steps (do nothing)

    for i in range(1, height + 1):
        dp[i] = sum(dp[i - s] for s in steps if i - s >= 0)

    return dp[height]