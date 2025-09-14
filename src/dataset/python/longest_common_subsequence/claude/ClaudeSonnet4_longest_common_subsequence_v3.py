'''
Longest Common Subsequence

Given 2 strings, find the longest common subseqence - https://en.wikipedia.org/wiki/Longest_common_subsequence_problem
NOT Longest Common Substring, this is a different problem.
Substring is a string composed ONLY of neighboring chars, subsequence could contain non-neighboring chars.

Input: 'ABAZDC', 'BACBAD'
Output: 'ABAD'

Input: 'I'm meto', 'I am Meto'
Output: 'Im eto'

=========================================
Dynamic programming solution.
Find more details here: https://www.geeksforgeeks.org/printing-longest-common-subsequence/
    Time Complexity:    O(N * M)
    Space Complexity:   O(N * M)    , can be O(M) see longest_common_substring.py solution (but you'll need to save subsequences)
'''


############
# Solution #
############

def longest_common_subsequence(str1, str2):
    if not str1 or not str2:
        return ''
    
    n, m = len(str1), len(str2)
    
    if n < m:
        str1, str2 = str2, str1
        n, m = m, n
    
    prev_row = [0] * (m + 1)
    curr_row = [0] * (m + 1)
    
    dp = [[0] * (m + 1) for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if str1[i - 1] == str2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    
    lcs_length = dp[n][m]
    if lcs_length == 0:
        return ''
    
    result = [''] * lcs_length
    i, j = n, m
    idx = lcs_length - 1
    
    while i > 0 and j > 0:
        if str1[i - 1] == str2[j - 1]:
            result[idx] = str1[i - 1]
            idx -= 1
            i -= 1
            j -= 1
        elif dp[i - 1][j] > dp[i][j - 1]:
            i -= 1
        else:
            j -= 1
    
    return ''.join(result)