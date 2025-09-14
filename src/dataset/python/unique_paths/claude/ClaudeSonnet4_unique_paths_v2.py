'''
Unique Paths

Find the unique paths in a matrix starting from the upper left corner and ending in the bottom right corner.

=========================================
Dynamic programming (looking from the left and up neighbour), but this is a slower solution, see the next one.
    Time Complexity:    O(N*M)
    Space Complexity:   O(M)
The DP table is creating an Pascal Triangle, so this problem can be easily solved by using the combinatorial formula!
Much faster and doesn't use extra space.
    Time Complexity:    O(min(M, N))
    Space Complexity:   O(1)
'''

################################
# Solution Dynamic Programming #
################################

def unique_paths_dp(n, m):
    # Use only one row to save memory
    dp = [1] * m
    
    # calculate only inner values
    for i in range(1, n):
        for j in range(1, m):
            dp[j] += dp[j - 1]

    return dp[m-1]


#################################
# Solution Combinations Formula #
#################################

def unique_paths(n, m):
    if m == 1 or n == 1:
        return 1
    
    m, n = min(m, n), max(m, n)
    lvl = m + n - 2
    pos = m - 1
    comb = 1

    # combinations formula C(N, R) = N! / R! * (N - R)!
    for i in range(1, pos + 1):
        comb = comb * lvl // i
        lvl -= 1

    return comb