def count_ip_addresses(S, K):
    n = len(S)
    if n == 0 or n < K or n > 3 * K:
        return 0

    dp = [0] * (n + 1)
    dp[0] = 1

    for i in range(K):
        max_j = min(3 * (i + 1), n)
        for j in range(max_j, i, -1):
            dp[j] = 0
            
            start = max(i, j - 3)
            for e in range(start, j):
                segment = S[e:j]
                if _is_valid_segment(segment):
                    dp[j] += dp[e]

    return dp[n]

def _is_valid_segment(segment):
    length = len(segment)
    if length == 0 or length > 3:
        return False
    
    if length > 1 and segment[0] == '0':
        return False
    
    if length == 1:
        return True
    elif length == 2:
        return True
    else:
        first_digit = ord(segment[0]) - 48
        if first_digit > 2:
            return False
        if first_digit < 2:
            return True
        
        second_digit = ord(segment[1]) - 48
        if second_digit > 5:
            return False
        if second_digit < 5:
            return True
        
        third_digit = ord(segment[2]) - 48
        return third_digit <= 5