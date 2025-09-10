def ordered_digits(number):
    n = len(number)
    prev_dp = [0] * 10

    for i in range(n):
        curr_dp = [float('inf')] * 10
        for j in range(10):
            diff = abs(j - int(number[i]))
            cost = min(diff, 10 - diff)
            curr_dp[j] = cost + min(prev_dp[:j + 1])
        prev_dp = curr_dp

    return min(prev_dp)