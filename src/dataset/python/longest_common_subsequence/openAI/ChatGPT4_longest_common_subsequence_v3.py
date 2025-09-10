def longest_common_subsequence(str1, str2):
    n, m = len(str1), len(str2)
    # Use a 2-row DP table to reduce memory usage
    dp = [[0] * (m + 1) for _ in range(2)]

    # Fill DP table
    for i in range(1, n + 1):
        current = i % 2
        previous = 1 - current
        for j in range(1, m + 1):
            if str1[i - 1] == str2[j - 1]:
                dp[current][j] = dp[previous][j - 1] + 1
            else:
                dp[current][j] = max(dp[previous][j], dp[current][j - 1])

    # Backtrack to find the subsequence
    i, j = n, m
    result = []
    while i > 0 and j > 0:
        if str1[i - 1] == str2[j - 1]:
            result.append(str1[i - 1])
            i -= 1
            j -= 1
        elif dp[(i - 1) % 2][j] >= dp[i % 2][j - 1]:
            i -= 1
        else:
            j -= 1

    return ''.join(reversed(result))