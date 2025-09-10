def is_valid(string):
    closing = {
        '}': '{',
        ']': '[',
        ')': '('
    }
    stack = []

    for char in string:
        if char in closing:
            if not stack or stack[-1] != closing[char]:
                return False
            stack.pop()
        else:
            stack.append(char)

    return not stack