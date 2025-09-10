def get_minimum_X(arr, k):
    n = len(arr)
    if n == 0 or k > n:
        return -1
    if k == n:
        return 1
    if k == 0:
        return max(arr) + 1
    arr = sorted(arr, reverse=True)
    if arr[k - 1] == arr[k]:
        return -1
    return arr[k] + 1