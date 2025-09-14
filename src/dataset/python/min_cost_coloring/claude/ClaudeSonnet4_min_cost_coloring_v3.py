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

    prev_min_cost, prev_min_idx = 0, -1
    prev_second_min_cost = 0

    for i in range(n):
        curr_min_cost, curr_min_idx = float('inf'), -1
        curr_second_min_cost = float('inf')

        for j in range(m):
            cost = dp[i][j] + (prev_second_min_cost if j == prev_min_idx else prev_min_cost)
            
            if cost < curr_min_cost:
                curr_second_min_cost = curr_min_cost
                curr_min_cost, curr_min_idx = cost, j
            elif cost < curr_second_min_cost:
                curr_second_min_cost = cost

        prev_min_cost, prev_min_idx = curr_min_cost, curr_min_idx
        prev_second_min_cost = curr_second_min_cost

    return prev_min_cost