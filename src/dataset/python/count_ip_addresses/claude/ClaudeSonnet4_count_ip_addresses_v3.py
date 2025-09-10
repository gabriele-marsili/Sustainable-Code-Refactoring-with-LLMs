def count_ip_addresses(S, K):
    n = len(S)
    if n == 0 or n < K or n > 3 * K:
        return 0

    prev_dp = [0] * (n + 1)
    prev_dp[0] = 1

    for i in range(K):
        curr_dp = [0] * (n + 1)
        max_j = min(3 * (i + 1), n)
        
        for j in range(i + 1, max_j + 1):
            start_pos = max(i, j - 3)
            
            for e in range(start_pos, j):
                segment_len = j - e
                if segment_len <= 3:
                    if is_valid_optimized(S, e, j):
                        curr_dp[j] += prev_dp[e]
        
        prev_dp = curr_dp

    return prev_dp[n]

def is_valid_optimized(S, start, end):
    length = end - start
    if length == 0 or length > 3:
        return False
    
    if length > 1 and S[start] == '0':
        return False
    
    if length == 1:
        return True
    elif length == 2:
        return True
    else:
        first_digit = ord(S[start]) - ord('0')
        if first_digit > 2:
            return False
        elif first_digit < 2:
            return True
        else:
            second_digit = ord(S[start + 1]) - ord('0')
            if second_digit > 5:
                return False
            elif second_digit < 5:
                return True
            else:
                third_digit = ord(S[start + 2]) - ord('0')
                return third_digit <= 5