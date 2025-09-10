def is_valid(string):
    closing = {
        '}': '{',
        ']': '[',
        ')': '('
    }
    stack = []
    append = stack.append
    pop = stack.pop

    for char in string:
        if char in closing:
            if not stack or pop() != closing[char]:
                return False
        else:
            append(char)

    return not stack