def climbing_staircase(steps, height):
    if height == 0:
        return 1
    if height < 0:
        return 0
    
    steps_set = frozenset(s for s in steps if s > 0 and s <= height)
    if not steps_set:
        return 0
    
    min_step = min(steps_set)
    if height < min_step:
        return 0
    
    dp = [0] * height
    
    for step in steps_set:
        if step <= height:
            dp[step - 1] = 1
    
    for i in range(min_step, height):
        for step in steps_set:
            if step <= i + 1:
                dp[i] += dp[i - step]
    
    return dp[height - 1]