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

import math

def min_cost_coloring(dp):
    n = len(dp)
    if n == 0:
        return 0
    m = len(dp[0])
    if m < 2:
        return -1

    min1 = math.inf
    min2 = math.inf
    index1 = -1

    for j in range(m):
        if dp[0][j] < min1:
            min2 = min1
            min1 = dp[0][j]
            index1 = j
        elif dp[0][j] < min2:
            min2 = dp[0][j]

    for i in range(1, n):
        new_min1 = math.inf
        new_min2 = math.inf
        new_index1 = -1

        for j in range(m):
            cost = dp[i][j]
            if j != index1:
                cost += min1
            else:
                cost += min2

            dp[i][j] = cost

            if cost < new_min1:
                new_min2 = new_min1
                new_min1 = cost
                new_index1 = j
            elif cost < new_min2:
                new_min2 = cost

        min1 = new_min1
        min2 = new_min2
        index1 = new_index1

    return min1