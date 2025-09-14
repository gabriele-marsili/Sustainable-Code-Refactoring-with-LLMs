def ordered_digits(number):
    n = len(number)
    prev_dp = [0] * 10
    curr_dp = [0] * 10
    
    for i in range(n):
        min_prev = 0
        digit = int(number[i])
        
        for j in range(10):
            if j > 0:
                min_prev = min(min_prev, prev_dp[j-1])
            
            diff = abs(j - digit)
            cost = min(diff, 10 - diff)
            curr_dp[j] = cost + min_prev
        
        prev_dp, curr_dp = curr_dp, prev_dp
    
    return min(prev_dp)