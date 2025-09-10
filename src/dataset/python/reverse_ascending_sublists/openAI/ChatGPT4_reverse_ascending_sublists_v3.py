def reverse_ascending_sublists(arr):
    if not arr:
        return arr

    start = 0
    for i in range(1, len(arr)):
        if arr[i] <= arr[i - 1]:
            arr[start:i] = arr[start:i][::-1]
            start = i
    arr[start:] = arr[start:][::-1]
    return arr

def reverse_arr(arr, start, end):
    arr[start:end + 1] = arr[start:end + 1][::-1]
    return arr