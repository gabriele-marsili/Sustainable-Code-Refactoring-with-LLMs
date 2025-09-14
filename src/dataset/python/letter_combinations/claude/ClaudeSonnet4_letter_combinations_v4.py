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
        result = [combo + char for combo in result for char in mappings[digit]]
    
    return result