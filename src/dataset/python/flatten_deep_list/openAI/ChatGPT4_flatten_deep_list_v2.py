def flatten_deep_list(arr):
    if not isinstance(arr, list):
        return [arr]
    stack = [arr]
    result = []
    while stack:
        current = stack.pop()
        if isinstance(current, list):
            stack.extend(reversed(current))
        else:
            result.append(current)
    return result