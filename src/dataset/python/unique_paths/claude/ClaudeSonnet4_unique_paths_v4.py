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
    if n == 1 or m == 1:
        return 1
    
    prev_row = [1] * m
    
    for i in range(1, n):
        for j in range(1, m):
            prev_row[j] += prev_row[j - 1]
    
    return prev_row[m - 1]


#################################
# Solution Combinations Formula #
#################################

def unique_paths(n, m):
    if n == 1 or m == 1:
        return 1
    
    smaller, larger = min(m - 1, n - 1), max(m - 1, n - 1)
    total_steps = smaller + larger
    
    result = 1
    for i in range(smaller):
        result = result * (total_steps - i) // (i + 1)
    
    return result