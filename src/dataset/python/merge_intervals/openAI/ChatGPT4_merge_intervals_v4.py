def merge_intervals(intervals):
    if not intervals:
        return []

    intervals.sort(key=lambda x: x[0])
    merged_intervals = [intervals[0]]

    for start, end in intervals[1:]:
        last_start, last_end = merged_intervals[-1]
        if start <= last_end + 1:
            merged_intervals[-1] = (last_start, max(last_end, end))
        else:
            merged_intervals.append((start, end))

    return merged_intervals