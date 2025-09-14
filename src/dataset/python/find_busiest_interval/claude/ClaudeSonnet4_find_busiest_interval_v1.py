def bussiest_interval(arriving, leaving):
    if not arriving:
        return (0, 0)
    
    # Sort in-place to avoid creating new lists
    arriving.sort()
    leaving.sort()
    
    n = len(arriving)
    i = j = 0
    overlapping = max_overlapping = 0
    start = end = 0
    
    while i < n and j < n:
        if arriving[i] <= leaving[j]:
            overlapping += 1
            if overlapping > max_overlapping:
                max_overlapping = overlapping
                start = arriving[i]
            i += 1
        else:
            if overlapping == max_overlapping:
                end = leaving[j]
            overlapping -= 1
            j += 1
    
    # Handle remaining leaving events
    if overlapping == max_overlapping and j < n:
        end = leaving[j]
    
    return (start, end)