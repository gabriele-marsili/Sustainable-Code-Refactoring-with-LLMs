from collections import defaultdict

def group_anagrams(strs):
    anagrams = defaultdict(list)
    
    for st in strs:
        hashable_object = hash_2(st)
        anagrams[hashable_object].append(st)
    
    return list(anagrams.values())

def hash_1(st):
    return tuple(sorted(st))

def hash_2(st):
    counts = [0] * 26
    for c in st:
        counts[ord(c) - 97] += 1
    return tuple(counts)