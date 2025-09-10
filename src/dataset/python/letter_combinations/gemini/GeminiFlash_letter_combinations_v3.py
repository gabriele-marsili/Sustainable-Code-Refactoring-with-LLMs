'''
Letter Combinations of a Phone Number

Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent.
A mapping of digit to letters is just like on the telephone buttons. Note that 1 does not map to any letters.

Input: '23'
Output: ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf']

=========================================
This problem could be solved in several ways (using recursion, stack, queue...) and the complexity is same in all, but this one has the simplest code.
Iterate all digits and in each step look for the previous combinations, create a new 3 or 4 combinations from each combination using the mapping letters.
    Time Complexity:    O(3^N * 4^M)    , N = number of digits that maps to 3 letters, M = number of digits that maps to 4 letters
    Space Complexity:   O(3^N * 4^M)
'''


############
# Solution #
############

def letter_combinations(digits):
    if not digits:
        return []

    mappings = {
        '2': 'abc',
        '3': 'def',
        '4': 'ghi',
        '5': 'jkl',
        '6': 'mno',
        '7': 'pqrs',
        '8': 'tuv',
        '9': 'wxyz'
    }

    result = ['']
    for digit in digits:
        temp = []
        for combination in result:
            for letter in mappings[digit]:
                temp.append(combination + letter)
        result = temp

    return result