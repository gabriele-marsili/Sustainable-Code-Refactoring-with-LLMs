def postfix_evaluate(items):
    stack = []
    
    for item in items:
        if item == '+':
            b = stack.pop()
            a = stack.pop()
            stack.append(a + b)
        elif item == '-':
            b = stack.pop()
            a = stack.pop()
            stack.append(a - b)
        elif item == '*':
            b = stack.pop()
            a = stack.pop()
            stack.append(a * b)
        elif item == '/':
            b = stack.pop()
            a = stack.pop()
            stack.append(0 if b == 0 else a // b)
        else:
            stack.append(item)
    
    return stack.pop()