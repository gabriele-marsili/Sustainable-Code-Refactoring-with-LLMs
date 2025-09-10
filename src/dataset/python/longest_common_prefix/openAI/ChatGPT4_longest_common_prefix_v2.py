def longest_common_prefix(strs):
    if not strs:
        return ''

    # Find the shortest string in the list
    shortest = min(strs, key=len)

    for i, char in enumerate(shortest):
        for string in strs:
            if string[i] != char:
                return shortest[:i]

    return shortest