def reverse_arr(arr):
    start, end = 0, len(arr) - 1
    while start < end:
        arr[start], arr[end] = arr[end], arr[start]
        start += 1
        end -= 1
    return arr

def swap(arr, i, j):
    arr[i], arr[j] = arr[j], arr[i]