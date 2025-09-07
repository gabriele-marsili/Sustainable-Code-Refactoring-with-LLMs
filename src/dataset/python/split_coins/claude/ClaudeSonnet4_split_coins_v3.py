def split_coins(coins):
    if not coins:
        return -1

    full_sum = sum(coins)
    half_sum = full_sum >> 1
    
    if full_sum == 0:
        return 0
    
    dp = 1
    
    for coin in coins:
        dp |= dp << coin
    
    target = dp & ((1 << (half_sum + 1)) - 1)
    closest_sum = (target & -target).bit_length() - 1 if target else 0
    
    while closest_sum <= half_sum and not (target & (1 << closest_sum)):
        closest_sum += 1
    
    if closest_sum > half_sum:
        closest_sum = half_sum
        while closest_sum > 0 and not (target & (1 << closest_sum)):
            closest_sum -= 1
    
    return full_sum - (closest_sum << 1)