def longest_common_prefix(strs):
    if not strs:
        return ''
    
    if len(strs) == 1:
        return strs[0]
    
    # Find minimum length to avoid unnecessary comparisons
    min_len = min(len(s) for s in strs)
    if min_len == 0:
        return ''
    
    # Binary search for optimal prefix length
    left, right = 0, min_len
    
    while left < right:
        mid = (left + right + 1) // 2
        if all(s[:mid] == strs[0][:mid] for s in strs[1:]):
            left = mid
        else:
            right = mid - 1
    
    return strs[0][:left]