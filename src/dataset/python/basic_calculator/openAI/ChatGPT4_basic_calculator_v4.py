def basic_calculator(s):
    def calculate(s, i):
        sign, res, num = 1, 0, 0
        while i < len(s):
            char = s[i]
            if char.isdigit():
                num = num * 10 + int(char)
            elif char == '(':
                num, i = calculate(s, i + 1)
            elif char in '+-':
                res += sign * num
                num = 0
                sign = 1 if char == '+' else -1
            elif char == ')':
                return res + sign * num, i
            i += 1
        return res + sign * num, i

    return calculate(s.replace(' ', ''), 0)[0]