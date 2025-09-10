def get_minimum_X(arr, k):
    n = len(arr)
    if n == 0 or k > n:
        return -1
    if k == n:
        return 1
    if k == 0:
        return max(arr) + 1 if arr else 1
    arr.sort()
    if arr[n - k - 1] == arr[n - k]:
        return -1
    return arr[n - k - 1] + 1