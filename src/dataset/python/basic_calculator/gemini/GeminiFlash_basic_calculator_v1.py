'''
Basic Calculator

Implement a basic calculator to evaluate a simple expression string.
The expression string may contain open '(' and closing parentheses ')',
the plus '+' or minus sign '-', non-negative integers and empty spaces ' '.

Input: '(1+(4+5+2)-3)+(6+8)'
Output: 23

Input: ' 2-1 + 2 '
Output: 3

=========================================
Start from the first character and respect the math rules. When brackets come, go inside the brackets
and compute the inner result, after that continue with adding or subtracting.
    Time Complexity:    O(N)
    Space Complexity:   O(K)    , much less than N (the deepest level of brackets)
'''


############
# Solution #
############

def basic_calculator(s):
    return calculate(s)

def calculate(s):
    sign = 1    # 1 means '+' and -1 means '-'
    res = 0
    num = 0
    i = 0
    stack = []

    while i < len(s):
        char = s[i]
        if char.isdigit():
            num = num * 10 + int(char)
        elif char == '+':
            res += sign * num
            num = 0
            sign = 1
        elif char == '-':
            res += sign * num
            num = 0
            sign = -1
        elif char == '(':
            stack.append(res)
            stack.append(sign)
            res = 0
            sign = 1
            num = 0
        elif char == ')':
            res += sign * num
            num = 0
            res *= stack.pop()
            res += stack.pop()
        i += 1

    res += sign * num
    return res