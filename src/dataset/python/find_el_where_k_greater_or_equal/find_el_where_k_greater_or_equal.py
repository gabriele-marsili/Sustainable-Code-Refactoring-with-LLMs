def get_minimum_X(arr, k):
    n = len(arr)
    if n == 0 or k > n:
        return -1
    if k == n:
        return 1
    arr.sort()
    if k == 0:
        return arr[-1] + 1
    if arr[-k] == arr[-(k + 1)]:
        return -1
    return arr[-(k + 1)] + 1