def postfix_evaluate(items):
    stack = []
    operations = {
        '+': lambda a, b: a + b,
        '-': lambda a, b: a - b,
        '*': lambda a, b: a * b,
        '/': lambda a, b: a // b if b != 0 else 0
    }

    for item in items:
        if item in operations:
            b = stack.pop()
            a = stack.pop()
            stack.append(operations[item](a, b))
        else:
            stack.append(item)

    return stack[0]