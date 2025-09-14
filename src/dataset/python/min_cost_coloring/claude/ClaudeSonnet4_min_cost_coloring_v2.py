'''
Min Cost Coloring

A builder is looking to build a row of N houses that can be of K different colors.
He has a goal of minimizing cost while ensuring that no two neighboring houses are of the same color.
Given an N by K matrix where the nth row and kth column represents the cost to build the
nth house with kth color, return the minimum cost which achieves this goal.

=========================================
Dynamic programming, for each house search for the cheapest combination of the previous houses.
But don't search the whole array with combinations (colors), save only the smallest 2
(in this case we're sure that the previous house doesn't have the same color).
    Time Complexity:    O(N * K)
    Space Complexity:   O(1)
'''

############
# Solution #
############

def min_cost_coloring(dp):
    n = len(dp)
    if n == 0:
        return 0
    m = len(dp[0])
    if m < 2:
        return -1

    # Initialize with first row values
    min1_cost, min1_idx = min((dp[0][j], j) for j in range(m))
    min2_cost = min(dp[0][j] for j in range(m) if j != min1_idx)
    
    for i in range(1, n):
        new_min1_cost = float('inf')
        new_min1_idx = -1
        new_min2_cost = float('inf')
        
        for j in range(m):
            # Add minimum valid previous cost
            cost = dp[i][j] + (min2_cost if j == min1_idx else min1_cost)
            
            # Update minimums
            if cost < new_min1_cost:
                new_min2_cost = new_min1_cost
                new_min1_cost = cost
                new_min1_idx = j
            elif cost < new_min2_cost:
                new_min2_cost = cost
        
        min1_cost, min1_idx, min2_cost = new_min1_cost, new_min1_idx, new_min2_cost
    
    return min1_cost