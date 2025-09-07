def split_coins(coins):
    if not coins:
        return -1

    full_sum = sum(coins)
    half_sum = full_sum >> 1
    
    if full_sum == 0:
        return 0
    
    dp = 1  # Use bitset for space efficiency
    
    for coin in coins:
        dp |= dp << coin
    
    # Find the largest achievable sum <= half_sum
    mask = (1 << (half_sum + 1)) - 1
    achievable = dp & mask
    
    closest_sum = achievable.bit_length() - 1
    while closest_sum >= 0 and not (achievable & (1 << closest_sum)):
        closest_sum -= 1
    
    return full_sum - (closest_sum << 1) if closest_sum >= 0 else -1