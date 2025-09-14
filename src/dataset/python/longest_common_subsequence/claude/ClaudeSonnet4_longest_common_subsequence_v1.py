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
    
    # Early return for empty strings
    if n == 0 or m == 0:
        return ''
    
    # Ensure str2 is the shorter string to minimize memory usage
    if n < m:
        str1, str2 = str2, str1
        n, m = m, n
    
    # Use only two rows instead of full matrix
    prev_row = [0] * (m + 1)
    curr_row = [0] * (m + 1)
    
    # Store the actual subsequence characters during DP
    prev_subseq = [[] for _ in range(m + 1)]
    curr_subseq = [[] for _ in range(m + 1)]
    
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if str1[i - 1] == str2[j - 1]:
                curr_row[j] = prev_row[j - 1] + 1
                curr_subseq[j] = prev_subseq[j - 1] + [str1[i - 1]]
            else:
                if prev_row[j] >= curr_row[j - 1]:
                    curr_row[j] = prev_row[j]
                    curr_subseq[j] = prev_subseq[j][:]
                else:
                    curr_row[j] = curr_row[j - 1]
                    curr_subseq[j] = curr_subseq[j - 1][:]
        
        # Swap rows
        prev_row, curr_row = curr_row, prev_row
        prev_subseq, curr_subseq = curr_subseq, prev_subseq
        
        # Clear current row for reuse
        for k in range(m + 1):
            curr_row[k] = 0
            curr_subseq[k] = []
    
    return ''.join(prev_subseq[m])