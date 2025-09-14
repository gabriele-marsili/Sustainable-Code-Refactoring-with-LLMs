'''
Merge Intervals

You are given an array of intervals.
Each interval is defined as: (start, end). e.g. (2, 5)
It represents all the integer numbers in the interval, including start and end. (in the example 2, 3, 4 and 5).
Given the array of intervals find the smallest set of unique intervals that contain the same integer numbers, without overlapping.


Input: [(1, 5), (2, 6)]
Output: [(1, 6)]

Input: [(2, 4), (5, 5), (6, 8)]
Output: [(2, 8)]

Input: [(1, 4), (6, 9), (8, 10)]
Output: [(1, 4), (6, 10)]

=========================================
Sort the intervals (using the start), accessing order. After that just iterate the intervals
and check if the current interval belongs to the last created interval.
    Time Complexity:    O(N LogN)
    Space Complexity:   O(N)    , for the result
'''


############
# Solution #
############

def merge_intervals(intervals):
    if not intervals:
        return []

    # sort the intervals in-place to save memory
    intervals.sort()
    
    merged = [intervals[0]]
    
    for current in intervals[1:]:
        last = merged[-1]
        # check if current interval overlaps or is adjacent to the last merged interval
        if current[0] <= last[1] + 1:
            # merge intervals by updating the end of the last interval
            if current[1] > last[1]:
                merged[-1] = (last[0], current[1])
        else:
            # add new interval
            merged.append(current)

    return merged