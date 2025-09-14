def generate_parentheses(n):
    if n == 0:
        return []
    
    result = []
    _generate(result, n, n, [])
    return result


def _generate(result, open_left, close_left, current):
    if close_left == 0:
        result.append(''.join(current))
        return
    
    if open_left == 0:
        current.extend([')'] * close_left)
        result.append(''.join(current))
        current[-close_left:] = []
        return
    
    current.append('(')
    _generate(result, open_left - 1, close_left, current)
    current.pop()
    
    if open_left < close_left:
        current.append(')')
        _generate(result, open_left, close_left - 1, current)
        current.pop()


def combinations(result, open_left, close_left, combination):
    if close_left == 0:
        result.append(combination)
    elif open_left == 0:
        result.append(combination + (')' * close_left))
    else:
        combinations(result, open_left - 1, close_left, combination + '(')
        if open_left < close_left:
            combinations(result, open_left, close_left - 1, combination + ')')