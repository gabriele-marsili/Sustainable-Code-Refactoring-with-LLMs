def score(word):
    point_map = {
        **dict.fromkeys('QZ', 10),
        **dict.fromkeys('JX', 8),
        'K': 5,
        **dict.fromkeys('FHVWY', 4),
        **dict.fromkeys('BCMP', 3),
        **dict.fromkeys('DG', 2)
    }
    return sum(point_map.get(l, 1) for l in word.upper())