def ordered_digits(number):
    n = len(number)
    prev_dp = [0] * 10
    curr_dp = [0] * 10

    for i in range(n):
        min_prev = float('inf')
        for j in range(10):
            min_prev = min(min_prev, prev_dp[j])
            diff = abs(j - int(number[i]))
            curr_dp[j] = min(diff, 10 - diff) + min_prev
        prev_dp, curr_dp = curr_dp, prev_dp

    return min(prev_dp)