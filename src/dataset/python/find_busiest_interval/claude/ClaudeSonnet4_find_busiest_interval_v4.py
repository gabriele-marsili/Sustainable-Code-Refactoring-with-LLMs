def bussiest_interval(arriving, leaving):
    arriving.sort()
    leaving.sort()
    n = len(arriving)
    i = j = overlapping = max_overlapping = 0
    start = end = 0
    
    while i < n:
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
    
    if overlapping == max_overlapping:
        end = leaving[j]
    
    return (start, end)