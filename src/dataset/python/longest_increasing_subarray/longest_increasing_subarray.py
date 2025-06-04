def longest_increasing_subarray(arr):
    n = len(arr)
    longest = 0
    current = 1
    i = 1
    while i < n:
        if arr[i] < arr[i - 1]:
            longest = max(longest, current)
            current = 1
        else:
            current += 1
        i += 1
    return max(longest, current)