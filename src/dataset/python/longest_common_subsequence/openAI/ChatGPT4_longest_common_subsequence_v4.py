def longest_common_subsequence(str1, str2):
    n, m = len(str1), len(str2)
    # Use a single array to reduce memory usage
    prev = [0] * (m + 1)
    curr = [0] * (m + 1)

    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if str1[i - 1] == str2[j - 1]:
                curr[j] = prev[j - 1] + 1
            else:
                curr[j] = max(prev[j], curr[j - 1])
        prev, curr = curr, prev

    # Reconstruct the subsequence
    result = []
    i, j = n, m
    while i > 0 and j > 0:
        if str1[i - 1] == str2[j - 1]:
            result.append(str1[i - 1])
            i -= 1
            j -= 1
        elif prev[j] > prev[j - 1]:
            i -= 1
        else:
            j -= 1

    return ''.join(reversed(result))