def longest_increasing_subarray(arr):
    longest = current = 1
    for i in range(1, len(arr)):
        if arr[i] < arr[i - 1]:
            longest = max(longest, current)
            current = 1
        else:
            current += 1
    return max(longest, current)