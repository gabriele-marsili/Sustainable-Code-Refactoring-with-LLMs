def split_coins(coins):
    if not coins:
        return -1

    full_sum = sum(coins)
    half_sum = full_sum // 2

    dp = [0] * (half_sum + 1)

    for c in coins:
        for i in range(half_sum, c - 1, -1):
            dp[i] = max(dp[i], dp[i - c] + c)

    closest_sum = dp[half_sum]
    return full_sum - 2 * closest_sum