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
        letters = mappings[digit]
        result = [combo + letter for combo in result for letter in letters]
    
    return result