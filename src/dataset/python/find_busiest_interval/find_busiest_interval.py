def bussiest_interval(arriving, leaving):
    arriving.sort()
    leaving.sort()
    n = len(arriving)
    i, j = 0, 0
    start, end = 0, 0
    overlapping = 0
    max_overlapping = 0
    while i < n:
        if arriving[i] <= leaving[j]:
            overlapping += 1
            if max_overlapping <= overlapping:
                max_overlapping = overlapping
                start = arriving[i]
            i += 1
        else:
            if max_overlapping == overlapping:
                end = leaving[j]
            overlapping -= 1
            j += 1
    if max_overlapping == overlapping:
        end = leaving[j]
    return (start, end)