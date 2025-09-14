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
    prev_min_cost, prev_min_idx = min((dp[0][j], j) for j in range(m))
    prev_second_min_cost = min(dp[0][j] for j in range(m) if j != prev_min_idx)

    for i in range(1, n):
        curr_min_cost = float('inf')
        curr_min_idx = -1
        curr_second_min_cost = float('inf')

        for j in range(m):
            # Calculate cost for current house with color j
            cost = dp[i][j] + (prev_second_min_cost if j == prev_min_idx else prev_min_cost)
            
            # Update current minimums
            if cost < curr_min_cost:
                curr_second_min_cost = curr_min_cost
                curr_min_cost = cost
                curr_min_idx = j
            elif cost < curr_second_min_cost:
                curr_second_min_cost = cost

        # Update previous minimums for next iteration
        prev_min_cost = curr_min_cost
        prev_min_idx = curr_min_idx
        prev_second_min_cost = curr_second_min_cost

    return prev_min_cost