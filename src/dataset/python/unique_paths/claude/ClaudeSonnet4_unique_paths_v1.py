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
    # Use only one row to save memory - O(m) space instead of O(n*m)
    dp = [1] * m
    
    # calculate values row by row
    for i in range(1, n):
        for j in range(1, m):
            dp[j] += dp[j - 1]
    
    return dp[m - 1]


#################################
# Solution Combinations Formula #
#################################

def unique_paths(n, m):
    # Ensure we're calculating C(total_steps, min_steps) for efficiency
    total_steps = n + m - 2
    min_steps = min(n - 1, m - 1)
    
    if min_steps == 0:
        return 1
    
    # Use integer arithmetic to avoid floating point operations
    result = 1
    for i in range(min_steps):
        result = result * (total_steps - i) // (i + 1)
    
    return result