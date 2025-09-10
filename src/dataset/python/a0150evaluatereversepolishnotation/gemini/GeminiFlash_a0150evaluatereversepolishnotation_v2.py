from typing import List


class Solution:
  def evalRPN(self, tokens: List[str]) -> int:
    stack = []
    for token in tokens:
      if token == '+':
        operand2 = stack.pop()
        operand1 = stack.pop()
        stack.append(operand1 + operand2)
      elif token == '-':
        operand2 = stack.pop()
        operand1 = stack.pop()
        stack.append(operand1 - operand2)
      elif token == '*':
        operand2 = stack.pop()
        operand1 = stack.pop()
        stack.append(operand1 * operand2)
      elif token == '/':
        operand2 = stack.pop()
        operand1 = stack.pop()
        stack.append(int(operand1 / operand2))
      else:
        stack.append(int(token))
    return stack[0]