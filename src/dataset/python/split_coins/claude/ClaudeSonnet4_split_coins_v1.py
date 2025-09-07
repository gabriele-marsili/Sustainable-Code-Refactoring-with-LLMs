'''
Split Coins

You have a number of coins with various amounts.
You need to split the coins in two groups so that the difference between those groups in minimal.

Input: [1, 1, 1, 3, 5, 10, 18]
Output: 1
Output explanation: First group 1, 3, 5, 10 (or 1, 1, 3, 5, 10) and second group 1, 1, 18 (or 1, 18).

=========================================
Simple dynamic programming solution. Find the closest sum to the half of the sum of all coins.
    Time Complexity:    O(C*HS)     , C = number of coins, HS = half of the sum of all coins
    Space Complexity:   O(HS)
'''


############
# Solution #
############

def split_coins(coins):
    if not coins:
        return -1

    full_sum = sum(coins)
    half_sum = full_sum >> 1
    
    # Use bitset for memory efficiency
    dp = 1  # bit 0 set to True
    
    for c in coins:
        dp |= dp << c
    
    # Find the largest achievable sum <= half_sum
    for i in range(half_sum, -1, -1):
        if dp & (1 << i):
            return full_sum - (i << 1)
    
    return -1