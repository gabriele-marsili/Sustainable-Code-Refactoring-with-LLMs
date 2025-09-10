def rotate_array_1(arr, k, right=True):
    n = len(arr)
    k %= n  # Handle cases where k > n

    if right:
        k = n - k

    # Use slicing directly for efficiency
    return arr[k:] + arr[:k]


def rotate_array_2(arr, k, right=True):
    n = len(arr)
    k %= n  # Handle cases where k > n

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


def gcd(a, b):
    while b:
        a, b = b, a % b
    return a