'''
Count Positives

Given several numbers, count how many different results bigger or equal than 0 can you produce by only
using addition (+) and substraction (-). All the numbers must be used.

Input: [2, 3, 1]
Output: 4
Output explanation:
        2+3+1 = 6
        2+3-1 = 4
        2-3+1 = 0
        2-3-1 = -2 (negative)
        -2+3+1 = 2
        -2+3-1 = 0 (double)
        -2-3+1 = -4 (negative)
        -2-3-1 = - 6 (negative)

=========================================
Use hashset and make all combinations.
    Time Complexity:    O(2^N)  , I'm not sure how to compute the real complexity, but it's TOO MUCH faster than 2^N
    Space Complexity:   O(2^N)
'''


############
# Solution #
############

def count_positives(numbers):
    if not numbers:
        return 1
    
    results = {0}
    
    for num in numbers:
        results = {res + num for res in results} | {res - num for res in results}
    
    return sum(1 for res in results if res >= 0)