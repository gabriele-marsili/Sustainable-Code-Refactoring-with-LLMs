def bussiest_interval(arriving, leaving):
    events = sorted((time, 1) for time in arriving) + sorted((time, -1) for time in leaving)
    max_overlapping = overlapping = 0
    start = end = 0

    for time, change in events:
        overlapping += change
        if overlapping > max_overlapping:
            max_overlapping = overlapping
            start = time
        elif overlapping == max_overlapping and change == -1:
            end = time

    return (start, end)