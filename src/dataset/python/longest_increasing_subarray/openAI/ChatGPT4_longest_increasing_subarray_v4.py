def longest_increasing_subarray(arr):
    longest = current = 1
    for i in range(1, len(arr)):
        current = current + 1 if arr[i] >= arr[i - 1] else 1
        longest = max(longest, current)
    return longest