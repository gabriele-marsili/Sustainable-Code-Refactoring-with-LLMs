def find_element_smaller_left_bigger_right(arr):
    n = len(arr)
    if n < 3:
        return -1

    left_max = [0] * n
    right_min = [0] * n

    left_max[0] = arr[0]
    for i in range(1, n):
        left_max[i] = max(left_max[i - 1], arr[i])

    right_min[n - 1] = arr[n - 1]
    for i in range(n - 2, -1, -1):
        right_min[i] = min(right_min[i + 1], arr[i])

    for i in range(1, n - 1):
        if left_max[i - 1] <= arr[i] <= right_min[i + 1]:
            return arr[i]

    return -1