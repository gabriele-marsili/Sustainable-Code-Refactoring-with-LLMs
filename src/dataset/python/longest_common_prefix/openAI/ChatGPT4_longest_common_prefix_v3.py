def longest_common_prefix(strs):
    if not strs:
        return ''

    for i in range(len(strs[0])):
        char = strs[0][i]
        if any(i >= len(s) or s[i] != char for s in strs[1:]):
            return strs[0][:i]

    return strs[0]