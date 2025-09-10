'''
Generate Parentheses

Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

Input: 3
Output:
        [
            '((()))',
            '(()())',
            '(())()',
            '()(())',
            '()()()'
        ]

=========================================
This problem could be solved in several ways (using stack, queue, or just a simple list - see letter_combinations.py), all of them have the same complexity.
I'll solve it using simple recursive algorithm.
    Time Complexity:    O(4^N)      , O(2^(2*N)) = O(4^N)
    Space Complexity:   O(4^N)
'''


############
# Solution #
############

def generate_parentheses(n):
    result = []
    if n > 0:
        _generate_parentheses(result, "", n, n)
    return result

def _generate_parentheses(result, current_string, open_left, close_left):
    if open_left == 0 and close_left == 0:
        result.append(current_string)
        return

    if open_left > 0:
        _generate_parentheses(result, current_string + "(", open_left - 1, close_left)

    if close_left > open_left:
        _generate_parentheses(result, current_string + ")", open_left, close_left - 1)