def merge_intervals(intervals):
    if not intervals:
        return []

    # Sort intervals by start
    intervals.sort()
    merged_intervals = [intervals[0]]

    for start, end in intervals[1:]:
        last_start, last_end = merged_intervals[-1]
        if start <= last_end + 1:
            # Merge intervals
            merged_intervals[-1] = (last_start, max(last_end, end))
        else:
            # Add new interval
            merged_intervals.append((start, end))

    return merged_intervals