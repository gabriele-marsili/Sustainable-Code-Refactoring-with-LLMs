def get_minimum_X(arr, k):
    n = len(arr)
    if n == 0 or k > n:
        return -1
    if k == n:
        return 1
    if k == 0:
        return max(arr) + 1
    threshold = sorted(arr)[-k-1]
    return -1 if arr.count(threshold) > 1 else threshold + 1