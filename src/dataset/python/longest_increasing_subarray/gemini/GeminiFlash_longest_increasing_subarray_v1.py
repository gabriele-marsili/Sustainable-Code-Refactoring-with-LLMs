def longest_increasing_subarray(arr):
    n = len(arr)
    if n == 0:
        return 0
    longest = 1
    current = 1
    for i in range(1, n):
        if arr[i] > arr[i - 1]:
            current += 1
        else:
            longest = max(longest, current)
            current = 1
    return max(longest, current)