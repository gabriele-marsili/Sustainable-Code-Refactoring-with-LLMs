def group_anagrams(strs):
    from collections import defaultdict

    anagrams = defaultdict(list)

    for st in strs:
        hashable_object = hash_2(st)
        anagrams[hashable_object].append(st)

    return list(anagrams.values())

def hash_1(st):
    return tuple(sorted(st))

def hash_2(st):
    from itertools import repeat
    all_letters = [0] * 26
    ord_a = ord('a')
    for c in st:
        all_letters[ord(c) - ord_a] += 1
    return tuple(all_letters)