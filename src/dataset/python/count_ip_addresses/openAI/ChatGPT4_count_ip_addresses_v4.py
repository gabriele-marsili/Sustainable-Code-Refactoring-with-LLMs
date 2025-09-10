def count_ip_addresses(S, K):
    n = len(S)
    if n < K:
        return 0

    dp = [0] * (n + 1)
    dp[0] = 1

    for i in range(1, K + 1):
        for j in range(n, i - 1, -1):
            dp[j] = 0
            for e in range(max(i - 1, j - 3), j):
                if S[e] != '0' or e == j - 1:
                    if int(S[e:j]) <= 255:
                        dp[j] += dp[e]

    return dp[n]