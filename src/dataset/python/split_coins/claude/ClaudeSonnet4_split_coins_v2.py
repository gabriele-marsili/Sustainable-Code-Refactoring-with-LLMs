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
    
    if half_sum == 0:
        return full_sum

    dp = 1  # Use bitset for space efficiency
    
    for c in coins:
        if c <= half_sum:
            dp |= dp << c

    # Find the highest bit set that's <= half_sum
    closest = 0
    mask = 1 << half_sum
    
    while mask > 0:
        if dp & mask:
            closest = mask.bit_length() - 1
            break
        mask >>= 1

    return full_sum - (closest << 1)