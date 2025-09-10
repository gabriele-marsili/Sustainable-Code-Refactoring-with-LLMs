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
    n = len(intervals)
    if n == 0:
        return []

    # sort the intervals in-place
    intervals.sort(key=lambda interval: interval[0])

    mergedIntervals = []
    mergedIntervals.append(intervals[0])

    for i in range(1, n):
        current_interval = intervals[i]
        last_merged_interval = mergedIntervals[-1]

        # check if this interval overlaps with the last merged interval
        if current_interval[0] <= last_merged_interval[1]:
            # merge the intervals by updating the end of the last merged interval
            mergedIntervals[-1] = (last_merged_interval[0], max(last_merged_interval[1], current_interval[1]))
        else:
            # add the current interval to the merged intervals
            mergedIntervals.append(current_interval)

    return mergedIntervals