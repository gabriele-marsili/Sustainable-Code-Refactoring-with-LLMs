def reverse_ascending_sublists(arr):
    n = len(arr)
    if n <= 1:
        return arr

    start = 0
    for i in range(1, n):
        if arr[i] <= arr[i - 1]:  # End of ascending sublist
            arr[start:i] = arr[start:i][::-1]
            start = i

    arr[start:n] = arr[start:n][::-1]  # Reverse the last sublist
    return arr