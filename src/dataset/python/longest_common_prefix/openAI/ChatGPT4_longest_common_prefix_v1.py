def longest_common_prefix(strs):
    if not strs:
        return ''

    lcp_idx = len(strs[0])

    for s in strs[1:]:
        lcp_idx = min(lcp_idx, len(s))
        for j in range(lcp_idx):
            if strs[0][j] != s[j]:
                lcp_idx = j
                break
        if lcp_idx == 0:
            return ''

    return strs[0][:lcp_idx]