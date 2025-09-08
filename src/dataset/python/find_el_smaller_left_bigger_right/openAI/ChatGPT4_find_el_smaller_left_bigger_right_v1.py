def find_element_smaller_left_bigger_right(arr):
    n = len(arr)
    if n < 3:
        return -1

    curr_max = arr[0]
    for i in range(1, n - 1):
        if arr[i] >= curr_max:
            if arr[i] <= min(arr[i + 1:]):
                return arr[i]
            curr_max = arr[i]
    return -1