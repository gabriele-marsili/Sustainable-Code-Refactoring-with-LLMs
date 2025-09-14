def flatten_deep_list(arr):
    if not isinstance(arr, list):
        return [arr]
    
    result = []
    stack = [arr]
    
    while stack:
        current = stack.pop()
        if isinstance(current, list):
            stack.extend(reversed(current))
        else:
            result.append(current)
    
    return result