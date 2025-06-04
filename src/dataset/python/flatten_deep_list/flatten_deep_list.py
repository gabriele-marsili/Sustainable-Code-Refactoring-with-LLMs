def flatten_deep_list(arr):
    if not isinstance(arr, list):
        return [arr]
    result = []
    for a in arr:
        result.extend(flatten_deep_list(a))
    return result