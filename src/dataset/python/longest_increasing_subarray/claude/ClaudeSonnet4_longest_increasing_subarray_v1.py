def longest_increasing_subarray(arr):
    if not arr:
        return 0
    
    n = len(arr)
    if n == 1:
        return 1
    
    longest = 1
    current = 1
    
    for i in range(1, n):
        if arr[i] >= arr[i - 1]:
            current += 1
        else:
            if current > longest:
                longest = current
            current = 1
    
    return longest if longest > current else current