def flatten_deep_list(arr):
    def helper(arr):
        stack = [arr]
        while stack:
            current = stack.pop()
            if isinstance(current, list):
                stack.extend(reversed(current))
            else:
                yield current
    return list(helper(arr))