'''
Count IP Addresses

An IP Address (IPv4) consists of 4 numbers which are all between 0 and 255.
In this problem however, we are dealing with 'Extended IP Addresses' which consist of K such numbers.
Given a string S containing only digits and a number K,
your task is to count how many valid 'Extended IP Addresses' can be formed.
An Extended IP Address is valid if:
* it consists of exactly K numbers
* each numbers is between 0 and 255, inclusive
* a number cannot have leading zeroes

Input: '1234567', 3
Output: 1
Output explanation: Valid IP addresses: '123.45.67'.

Input: '100111', 3
Output: 1
Output explanation: Valid IP addresses: '100.1.11', '100.11.1', '10.0.111'.

Input: '345678', 2
Output: 0
Output explanation: It is not possible to form a valid IP Address with two numbers.

=========================================
1D Dynamic programming solution.
    Time Complexity:    O(N*K)
    Space Complexity:   O(N)
'''


############
# Solution #
############

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
                if is_valid_optimized(segment):
                    dp[j] += dp[e]

    return dp[n]

def is_valid_optimized(s):
    length = len(s)
    if length == 0 or length > 3:
        return False
    
    if length > 1 and s[0] == '0':
        return False
    
    # Direct comparison without int conversion for common cases
    if length == 1:
        return True
    elif length == 2:
        return True
    else:  # length == 3
        # Check if > 255 without full int conversion
        if s[0] > '2':
            return False
        elif s[0] == '2':
            if s[1] > '5':
                return False
            elif s[1] == '5' and s[2] > '5':
                return False
        return True