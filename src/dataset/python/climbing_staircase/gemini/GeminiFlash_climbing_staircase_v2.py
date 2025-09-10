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
    dp = [0] * (height + 1)
    dp[0] = 1

    for i in range(1, height + 1):
        for step in steps:
            if i - step >= 0:
                dp[i] += dp[i - step]

    return dp[height]