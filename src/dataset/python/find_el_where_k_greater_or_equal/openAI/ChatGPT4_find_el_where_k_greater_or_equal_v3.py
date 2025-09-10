def get_minimum_X(arr, k):
    n = len(arr)
    if n == 0 or k > n:
        return -1
    if k == n:
        return 1
    if k == 0:
        return max(arr) + 1
    threshold = sorted(arr, reverse=True)[k - 1]
    if arr.count(threshold) > 1:
        return -1
    return threshold + 1