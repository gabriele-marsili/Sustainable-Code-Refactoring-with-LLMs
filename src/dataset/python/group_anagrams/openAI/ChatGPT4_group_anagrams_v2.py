def group_anagrams(strs):
    from collections import defaultdict

    anagrams = defaultdict(list)

    for st in strs:
        # Use hash_2 for better performance with fixed-length tuples
        hashable_object = hash_2(st)
        anagrams[hashable_object].append(st)

    return list(anagrams.values())

def hash_1(st):
    # Optimized sorting and tuple creation
    return tuple(sorted(st))

def hash_2(st):
    # Optimized character counting using a generator
    ord_a = ord('a')
    return tuple(st.count(chr(i + ord_a)) for i in range(26))