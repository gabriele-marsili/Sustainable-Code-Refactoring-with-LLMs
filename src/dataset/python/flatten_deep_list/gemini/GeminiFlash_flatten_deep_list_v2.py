def flatten_deep_list(arr):
    result = []
    stack = [arr]
    while stack:
        item = stack.pop()
        if isinstance(item, list):
            stack.extend(reversed(item))  # Reverse to maintain original order
        else:
            result.append(item)
    return result