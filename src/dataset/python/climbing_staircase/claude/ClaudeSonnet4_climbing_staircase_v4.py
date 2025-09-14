def climbing_staircase(steps, height):
    if height == 0:
        return 1
    
    dp = [0] * height
    
    for s in steps:
        if s <= height:
            dp[s - 1] = 1
    
    for i in range(height):
        if dp[i] > 0:
            for s in steps:
                if i + s < height:
                    dp[i + s] += dp[i]
    
    return dp[height - 1]