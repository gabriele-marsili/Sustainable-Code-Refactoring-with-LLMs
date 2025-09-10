def reverse_ascending_sublists(arr):
    if not arr:
        return []

    result = []
    sublist = [arr[0]]

    for i in range(1, len(arr)):
        if arr[i] > arr[i - 1]:
            sublist.append(arr[i])
        else:
            result.extend(reversed(sublist))
            sublist = [arr[i]]

    result.extend(reversed(sublist))
    return result