def bussiest_interval(arriving, leaving):
    if not arriving:
        return (0, 0)
    
    arriving.sort()
    leaving.sort()
    n = len(arriving)
    i = j = overlapping = max_overlapping = 0
    start = end = arriving[0]
    
    while i < n and j < n:
        if arriving[i] <= leaving[j]:
            overlapping += 1
            if overlapping > max_overlapping:
                max_overlapping = overlapping
                start = arriving[i]
            elif overlapping == max_overlapping:
                start = arriving[i]
            i += 1
        else:
            if overlapping == max_overlapping:
                end = leaving[j]
            overlapping -= 1
            j += 1
    
    if j < n and overlapping == max_overlapping:
        end = leaving[j]
    
    return (start, end)