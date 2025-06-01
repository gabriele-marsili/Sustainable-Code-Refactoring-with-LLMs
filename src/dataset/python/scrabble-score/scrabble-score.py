def score(word):
    score = 0
    four_pointer = set(['F', 'H', 'V', 'W', 'Y'])
    three_pointer = set(['B', 'C', 'M', 'P'])
    for l in word.upper():
        if l == 'Q' or l == 'Z':
           score += 10
        elif l == 'J' or l == 'X':
           score += 8
        elif l == 'K':
           score += 5
        elif l in four_pointer:
           score += 4
        elif l in three_pointer:
           score += 3
        elif l == 'D' or l == 'G':
           score += 2
        else:
           score += 1
    return score
