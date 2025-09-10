def rotate_array_1(arr, k, right=True):
    n = len(arr)
    k %= n
    if right:
        k = n - k
    return arr[k:] + arr[:k]

def rotate_array_2(arr, k, right=True):
    from math import gcd
    n = len(arr)
    k %= n
    if not right:
        k = n - k

    sets = gcd(n, k)
    for i in range(sets):
        curr = arr[i]
        idx = i
        while True:
            next_idx = (idx + k) % n
            if next_idx == i:
                break
            arr[idx] = arr[next_idx]
            idx = next_idx
        arr[idx] = curr

    return arr