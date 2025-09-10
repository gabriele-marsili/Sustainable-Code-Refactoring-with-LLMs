def basic_calculator(s):
    return calculate(s, 0)[0]

def calculate(s, i):
    sign, res, num = 1, 0, 0
    while i < len(s):
        char = s[i]
        if char.isdigit():
            num = num * 10 + int(char)
        elif char == '(':
            inner_res, i = calculate(s, i + 1)
            res += inner_res * sign
        elif char in '+-':
            res += num * sign
            sign = 1 if char == '+' else -1
            num = 0
        elif char == ')':
            res += num * sign
            return res, i
        i += 1
    res += num * sign
    return res, i