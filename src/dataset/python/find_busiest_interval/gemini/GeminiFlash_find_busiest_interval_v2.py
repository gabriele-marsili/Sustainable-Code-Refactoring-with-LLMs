def bussiest_interval(arriving, leaving):
    arriving.sort()
    leaving.sort()
    n = len(arriving)
    i, j = 0, 0
    start, end = arriving[0], 0  # Initialize start with the first arrival
    overlapping = 0
    max_overlapping = 0

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

    # Handle the case where all arrivals have occurred but some departures are left
    while j < n and overlapping == max_overlapping:
        end = leaving[j]
        j += 1

    return (start, end)