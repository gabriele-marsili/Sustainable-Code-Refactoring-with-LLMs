def ordered_digits(number):
    n = len(number)
    prev_dp = [0] * 10
    curr_dp = [0] * 10
    
    for i in range(n):
        min_prev = prev_dp[0]
        for j in range(1, 10):
            if prev_dp[j] < min_prev:
                min_prev = prev_dp[j]
        
        digit = int(number[i])
        for j in range(10):
            if prev_dp[j] < min_prev:
                min_prev = prev_dp[j]
            diff = abs(j - digit)
            curr_dp[j] = min(diff, 10 - diff) + min_prev
        
        prev_dp, curr_dp = curr_dp, prev_dp
    
    result = prev_dp[0]
    for j in range(1, 10):
        if prev_dp[j] < result:
            result = prev_dp[j]
    
    return result