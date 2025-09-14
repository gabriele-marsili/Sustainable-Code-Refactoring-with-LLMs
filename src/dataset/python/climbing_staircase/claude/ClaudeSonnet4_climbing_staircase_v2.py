'''
Climbing Staircase

There exists a staircase with N steps, and you can climb up either X different steps at a time.
Given N, write a function that returns the number of unique ways you can climb the staircase.
The order of the steps matters.

Input: steps = [1, 2], height = 4
Output: 5
Output explanation:
1, 1, 1, 1
2, 1, 1
1, 2, 1
1, 1, 2
2, 2

=========================================
Dynamic Programing solution.
    Time Complexity:    O(N*S)
    Space Complexity:   O(N)
'''


############
# Solution #
############

def climbing_staircase(steps, height):
    if height == 0:
        return 1
    if height < 0:
        return 0
    
    # Filter steps to only include valid ones
    valid_steps = [s for s in steps if s <= height]
    if not valid_steps:
        return 0
    
    dp = [0] * height
    
    # Initialize base cases more efficiently
    for s in valid_steps:
        dp[s - 1] = 1
    
    # Build up the solution
    for i in range(height):
        if dp[i] > 0:  # Only process positions that are reachable
            for s in valid_steps:
                if i + s < height:
                    dp[i + s] += dp[i]
    
    return dp[height - 1]