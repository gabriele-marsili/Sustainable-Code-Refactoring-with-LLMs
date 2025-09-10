def generate_parentheses(n):
    if n == 0:
        return []
    result = []
    combinations(result, n, n, [])
    return result

def combinations(result, open_left, close_left, combination):
    if close_left == 0:
        result.append(''.join(combination))
        return
    if open_left > 0:
        combination.append('(')
        combinations(result, open_left - 1, close_left, combination)
        combination.pop()
    if open_left < close_left:
        combination.append(')')
        combinations(result, open_left, close_left - 1, combination)
        combination.pop()