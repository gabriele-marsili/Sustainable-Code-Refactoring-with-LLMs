def power_set(arr):
    result = [[]]
    for num in arr:
        result += [subset + [num] for subset in result]
    return result