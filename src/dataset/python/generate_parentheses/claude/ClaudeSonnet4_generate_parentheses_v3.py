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
    if n == 0:
        return []
    
    result = []
    _generate_combinations(result, n, n, [])
    return result


def combinations(result, open_left, close_left, combination):
    _generate_combinations(result, open_left, close_left, list(combination))


def _generate_combinations(result, open_left, close_left, combination):
    if close_left == 0:
        result.append(''.join(combination))
        return
    
    if open_left == 0:
        combination.extend([')'] * close_left)
        result.append(''.join(combination))
        return
    
    combination.append('(')
    _generate_combinations(result, open_left - 1, close_left, combination)
    combination.pop()
    
    if open_left < close_left:
        combination.append(')')
        _generate_combinations(result, open_left, close_left - 1, combination)
        combination.pop()