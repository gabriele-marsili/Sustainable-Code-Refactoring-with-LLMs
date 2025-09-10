def reverse_ascending_sublists(arr):
    if not arr:
        return []

    result = []
    start = 0

    for i in range(1, len(arr)):
        if arr[i] <= arr[i - 1]:
            result.extend(reversed(arr[start:i]))
            start = i

    result.extend(reversed(arr[start:]))
    return result