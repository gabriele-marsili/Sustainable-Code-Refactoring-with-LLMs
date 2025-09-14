def basic_calculator(s):
    stack = []
    result = 0
    number = 0
    sign = 1
    
    for char in s:
        if char.isdigit():
            number = number * 10 + int(char)
        elif char in '+-':
            result += sign * number
            number = 0
            sign = 1 if char == '+' else -1
        elif char == '(':
            stack.append(result)
            stack.append(sign)
            result = 0
            sign = 1
        elif char == ')':
            result += sign * number
            number = 0
            result *= stack.pop()
            result += stack.pop()
    
    return result + sign * number

def calculate(s, i):
    sign = 1
    res = 0
    num = 0

    while i < len(s) and s[i] != ')':
        char = s[i]
        if '0' <= char <= '9':
            num = num * 10 + int(char)
        elif char == '(':
            brackets = calculate(s, i + 1)
            res += brackets[0] * sign
            i = brackets[1]
        elif char != ' ':
            res += num * sign
            num = 0
            sign = -1 if char == '-' else 1
        i += 1

    res += num * sign
    return (res, i)