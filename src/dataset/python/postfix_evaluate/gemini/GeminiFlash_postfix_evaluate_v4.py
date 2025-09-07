'''
Postfix Evaluate

When arithmetic expressions are given in the familiar infix notation 2 + 3 * 4, we need to use
parentheses to force a different evaluation order than the usual PEMDAS order determined by
precedence and associativity. Writing arithmetic expressions in postfix notation (also known as
Reverse Polish Notation) may look strange to us humans accustomed to the conventional infix
notation, but is computationally much easier to handle, since postfix notation allows any evaluation
order to be expressed without using any parentheses at all! A postfix expression is given as a list of
items that can be either individual integers or one of the strings '+', '-', '*' and '/' for the four
possible arithmetic operators. Calculate the result of the postfix expression.

Input: [2, 3, '+', 4, '*']
Output: 20
Output explanation: (2+3) * 4

Input: [1, 2, 3, 4, 5, 6, '*', '*', '*', '*', '*']
Output: 720
Output explanation: 1 * 2 * 3 * 4 * 5 * 6

=========================================
Use stack, save all numbers into the stack.
When a sign comes, pop the last 2 numbers from the stack, calculate their result and return the result into the stack.
    Time Complexity:    O(N)
    Space Complexity:   O(N)
'''


############
# Solution #
############

def postfix_evaluate(items):
    stack = []
    for item in items:
        if isinstance(item, str):
            b = stack.pop()
            a = stack.pop()
            if item == '+':
                stack.append(a + b)
            elif item == '-':
                stack.append(a - b)
            elif item == '*':
                stack.append(a * b)
            elif item == '/':
                stack.append(0 if (b == 0) else (a // b))
        else:
            stack.append(item)
    return stack.pop()