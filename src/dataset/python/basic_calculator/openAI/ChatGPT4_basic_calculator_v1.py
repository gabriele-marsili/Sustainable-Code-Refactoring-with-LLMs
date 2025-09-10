def basic_calculator(s):
    return calculate(s, 0)[0]

def calculate(s, i):
    sign = 1
    res = 0
    num = 0
    n = len(s)

    while i < n:
        char = s[i]
        if char.isdigit():
            num = num * 10 + int(char)
        elif char == '(':
            num, i = calculate(s, i + 1)
        elif char == ')':
            res += num * sign
            return res, i
        elif char in '+-':
            res += num * sign
            sign = 1 if char == '+' else -1
            num = 0
        i += 1

    res += num * sign
    return res, i