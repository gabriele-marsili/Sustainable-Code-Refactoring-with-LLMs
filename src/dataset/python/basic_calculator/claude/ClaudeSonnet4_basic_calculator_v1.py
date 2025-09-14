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
    stack = []
    result = 0
    number = 0
    sign = 1
    
    for char in s:
        if char.isdigit():
            number = number * 10 + int(char)
        elif char == '+':
            result += sign * number
            number = 0
            sign = 1
        elif char == '-':
            result += sign * number
            number = 0
            sign = -1
        elif char == '(':
            stack.append(result)
            stack.append(sign)
            result = 0
            sign = 1
        elif char == ')':
            result += sign * number
            number = 0
            result *= stack.pop()  # sign before parenthesis
            result += stack.pop()  # result before parenthesis
    
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