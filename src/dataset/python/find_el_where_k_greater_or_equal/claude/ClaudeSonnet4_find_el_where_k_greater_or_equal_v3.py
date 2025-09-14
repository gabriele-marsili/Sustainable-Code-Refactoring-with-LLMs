def get_minimum_X(arr, k):
    n = len(arr)
    if n == 0 or k > n:
        return -1
    if k == n:
        return 1
    if k == 0:
        return max(arr) + 1
    
    kth_largest = sorted(arr, reverse=True)[k]
    if k < n - 1:
        next_largest = sorted(arr, reverse=True)[k + 1]
        if kth_largest == next_largest:
            return -1
        return next_largest + 1
    return kth_largest + 1