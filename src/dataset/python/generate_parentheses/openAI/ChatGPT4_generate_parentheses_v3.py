def generate_parentheses(n):
    if n == 0:
        return []
    
    result = []
    stack = [(n, n, '')]
    
    while stack:
        open_left, close_left, combination = stack.pop()
        
        if close_left == 0:
            result.append(combination)
        else:
            if open_left > 0:
                stack.append((open_left - 1, close_left, combination + '('))
            if open_left < close_left:
                stack.append((open_left, close_left - 1, combination + ')'))
    
    return result