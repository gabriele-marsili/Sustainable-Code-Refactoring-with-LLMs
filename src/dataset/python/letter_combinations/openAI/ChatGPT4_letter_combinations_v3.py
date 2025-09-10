def letter_combinations(digits):
    if not digits:
        return []

    mappings = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    }
    
    from itertools import product
    return [''.join(comb) for comb in product(*(mappings[d] for d in digits))]