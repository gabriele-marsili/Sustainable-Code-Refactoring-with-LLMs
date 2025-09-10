def flatten_deep_list(arr):
    if not isinstance(arr, list):
        return [arr]
    result = []
    stack = [arr]
    while stack:
        item = stack.pop()
        if isinstance(item, list):
            stack.extend(reversed(item))
        else:
            result.append(item)
    return result