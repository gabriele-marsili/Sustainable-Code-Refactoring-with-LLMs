def generate_parentheses(n):
    if n == 0:
        return []
    
    result = []
    combinations(n, n, '', result)
    return result


def combinations(open_left, close_left, combination, result):
    if open_left == 0 and close_left == 0:
        result.append(combination)
        return

    if open_left > 0:
        combinations(open_left - 1, close_left, combination + '(', result)

    if close_left > open_left:
        combinations(open_left, close_left - 1, combination + ')', result)