'''
Unique Paths

Find the unique paths in a matrix starting from the upper left corner and ending in the bottom right corner.

=========================================
Dynamic programming (looking from the left and up neighbour), but this is a slower solution, see the next one.
    Time Complexity:    O(N*M)
    Space Complexity:   O(N*M)
The DP table is creating an Pascal Triangle, so this problem can be easily solved by using the combinatorial formula!
Much faster and doesn't use extra space.
    Time Complexity:    O(min(M, N))
    Space Complexity:   O(1)
'''

################################
# Solution Dynamic Programming #
################################

def unique_paths_dp(n, m):
    # all values at i=0 should be 1 (the rest are not important, they'll be computed later)
    dp = [[1] * m for _ in range(n)]

    # calculate only inner values
    for i in range(1, n):
        for j in range(1, m):
            dp[i][j] = dp[i][j - 1] + dp[i - 1][j]

    return dp[n-1][m-1]


#################################
# Solution Combinations Formula #
#################################

def unique_paths(n, m):
    if n == 1 or m == 1:
        return 1

    smaller = min(n, m) - 1
    larger = max(n, m) - 1
    total = smaller + larger

    numerator = 1
    for i in range(total, larger, -1):
        numerator *= i

    denominator = 1
    for i in range(1, smaller + 1):
        denominator *= i

    return numerator // denominator