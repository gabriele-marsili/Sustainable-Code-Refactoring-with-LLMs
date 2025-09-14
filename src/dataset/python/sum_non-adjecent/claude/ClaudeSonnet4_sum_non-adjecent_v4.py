def sum_non_adjacent(arr):
    if not arr:
        return 0
    
    if len(arr) == 1:
        return max(arr[0], 0)
    
    prev_prev = max(arr[0], 0)
    prev = max(arr[1], prev_prev)
    
    if len(arr) == 2:
        return prev
    
    for i in range(2, len(arr)):
        current = max(prev, prev_prev + arr[i])
        prev_prev, prev = prev, current
    
    return prev