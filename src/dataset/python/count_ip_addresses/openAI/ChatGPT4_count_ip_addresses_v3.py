def count_ip_addresses(S, K):
    n = len(S)
    if n == 0 or n < K:
        return 0

    dp = [0] * (n + 1)
    dp[0] = 1

    for i in range(K):
        for j in range(n, i, -1):
            dp[j] = sum(dp[e] for e in range(max(i, j - 3), j) if is_valid(S[e:j]))

    return dp[n]

def is_valid(S):
    return S[0] != '0' and int(S) <= 255 if S else False