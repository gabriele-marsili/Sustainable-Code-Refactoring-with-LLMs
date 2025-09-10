def min_cost_coloring(dp):
    n = len(dp)
    if n == 0:
        return 0
    m = len(dp[0])
    if m < 2:
        return -1

    prev_min1, prev_min2, prev_min1_idx = 0, 0, -1

    for i in range(n):
        curr_min1, curr_min2, curr_min1_idx = float('inf'), float('inf'), -1

        for j in range(m):
            cost = dp[i][j] + (prev_min2 if j == prev_min1_idx else prev_min1)

            if cost < curr_min1:
                curr_min2, curr_min1 = curr_min1, cost
                curr_min1_idx = j
            elif cost < curr_min2:
                curr_min2 = cost

        prev_min1, prev_min2, prev_min1_idx = curr_min1, curr_min2, curr_min1_idx

    return prev_min1