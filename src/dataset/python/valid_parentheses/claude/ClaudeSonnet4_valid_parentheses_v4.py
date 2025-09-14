from collections import deque

def is_valid(string):
    closing = {'}': '{', ']': '[', ')': '('}
    stack = deque()
    
    for char in string:
        if char in closing:
            if not stack or stack.pop() != closing[char]:
                return False
        else:
            stack.append(char)
    
    return not stack