from collections.abc import Iterable

def flatten_deep_list(arr):
    stack = [arr]
    result = []
    while stack:
        current = stack.pop()
        if isinstance(current, Iterable) and not isinstance(current, (str, bytes)):
            stack.extend(reversed(current))
        else:
            result.append(current)
    return result