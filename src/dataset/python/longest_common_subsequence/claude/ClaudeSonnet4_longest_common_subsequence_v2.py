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
    n, m = len(str1), len(str2)
    
    # Ensure str2 is the shorter string to minimize memory usage
    if n < m:
        str1, str2 = str2, str1
        n, m = m, n
    
    # Use only two rows instead of full matrix
    prev = [0] * (m + 1)
    curr = [0] * (m + 1)
    
    # Track the actual subsequence using a more memory-efficient approach
    dp_full = [[0] * (m + 1) for _ in range(n + 1)]
    
    # Fill DP table
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if str1[i - 1] == str2[j - 1]:
                curr[j] = prev[j - 1] + 1
                dp_full[i][j] = curr[j]
            else:
                curr[j] = max(prev[j], curr[j - 1])
                dp_full[i][j] = curr[j]
        prev, curr = curr, prev
    
    # Reconstruct subsequence
    lcs_length = dp_full[n][m]
    if lcs_length == 0:
        return ''
    
    result = [''] * lcs_length
    i, j = n, m
    idx = lcs_length - 1
    
    while i > 0 and j > 0 and idx >= 0:
        if str1[i - 1] == str2[j - 1]:
            result[idx] = str1[i - 1]
            idx -= 1
            i -= 1
            j -= 1
        elif dp_full[i - 1][j] > dp_full[i][j - 1]:
            i -= 1
        else:
            j -= 1
    
    return ''.join(result)