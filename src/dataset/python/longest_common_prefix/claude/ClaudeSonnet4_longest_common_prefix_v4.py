def longest_common_prefix(strs):
    if not strs:
        return ''
    
    if len(strs) == 1:
        return strs[0]
    
    min_len = min(len(s) for s in strs)
    if min_len == 0:
        return ''
    
    for i in range(min_len):
        char = strs[0][i]
        for j in range(1, len(strs)):
            if strs[j][i] != char:
                return strs[0][:i]
    
    return strs[0][:min_len]