import math

def min_cost_coloring(dp):
    n = len(dp)
    if n == 0:
        return 0
    m = len(dp[0])
    if m < 2:
        return -1

    prev_min1_cost, prev_min1_idx = 0, -1
    prev_min2_cost = 0

    for i in range(n):
        curr_min1_cost, curr_min1_idx = math.inf, -1
        curr_min2_cost = math.inf

        for j in range(m):
            cost = dp[i][j] + (prev_min2_cost if j == prev_min1_idx else prev_min1_cost)
            dp[i][j] = cost

            if cost < curr_min1_cost:
                curr_min2_cost = curr_min1_cost
                curr_min1_cost, curr_min1_idx = cost, j
            elif cost < curr_min2_cost:
                curr_min2_cost = cost

        prev_min1_cost, prev_min1_idx = curr_min1_cost, curr_min1_idx
        prev_min2_cost = curr_min2_cost

    return min(dp[n - 1])