def longest_common_subsequence(str1, str2):
    n, m = len(str1), len(str2)
    
    if n == 0 or m == 0:
        return ""
    
    if n < m:
        str1, str2 = str2, str1
        n, m = m, n
    
    prev_row = [0] * (m + 1)
    curr_row = [0] * (m + 1)
    
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if str1[i - 1] == str2[j - 1]:
                curr_row[j] = prev_row[j - 1] + 1
            else:
                curr_row[j] = max(prev_row[j], curr_row[j - 1])
        prev_row, curr_row = curr_row, prev_row
    
    lcs_length = prev_row[m]
    if lcs_length == 0:
        return ""
    
    result = [''] * lcs_length
    i, j = n, m
    dp = [[0] * (m + 1) for _ in range(n + 1)]
    
    for x in range(1, n + 1):
        for y in range(1, m + 1):
            if str1[x - 1] == str2[y - 1]:
                dp[x][y] = dp[x - 1][y - 1] + 1
            else:
                dp[x][y] = max(dp[x - 1][y], dp[x][y - 1])
    
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