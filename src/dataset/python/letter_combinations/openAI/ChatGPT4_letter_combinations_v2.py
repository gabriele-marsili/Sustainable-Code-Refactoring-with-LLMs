def letter_combinations(digits):
    if not digits:
        return []

    mappings = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    }
    prev_combinations = ['']

    for digit in digits:
        prev_combinations = [combination + letter for combination in prev_combinations for letter in mappings[digit]]

    return prev_combinations