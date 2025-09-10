def bussiest_interval(arriving, leaving):
    events = [(time, 1) for time in arriving] + [(time, -1) for time in leaving]
    events.sort()
    
    overlapping = max_overlapping = 0
    start = end = None
    
    for time, change in events:
        overlapping += change
        if overlapping > max_overlapping:
            max_overlapping = overlapping
            start = time
        elif overlapping == max_overlapping and change == -1:
            end = time
    
    return (start, end)