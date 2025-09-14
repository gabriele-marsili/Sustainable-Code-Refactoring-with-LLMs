'''
Perfect Rectangle

Given N axis-aligned rectangles where N > 0, determine if they all together form an exact cover of a rectangular region.
Each rectangle is represented as a bottom-left point and a top-right point. For example, a unit square is represented as [1,1,2,2].
(coordinate of bottom-left point is (1, 1) and top-right point is (2, 2)).

Input: [
        [1, 1, 3, 3],
        [3, 1, 4, 2],
        [3, 2, 4, 4],
        [1, 3, 2, 4],
        [2, 3, 3, 4]
    ]
Output: True
Output explanation: All 5 rectangles together form an exact cover of a rectangular region.

Input: [
        [1, 1, 2, 3],
        [1, 3, 2, 4],
        [3, 1, 4, 2],
        [3, 2, 4, 4]
    ]
Output: False
Output explanation: Because there is a gap between the two rectangular regions.

Input: [
        [1, 1, 3, 3],
        [3, 1, 4, 2],
        [1, 3, 2, 4],
        [3, 2, 4, 4]
    ]
Output: False
Output explanation: Because there is a gap in the top center.

Input: [
        [1, 1, 3, 3],
        [3, 1, 4, 2],
        [1, 3, 2, 4],
        [2, 2, 4, 4]
    ]
Output: False
Output explanation: Because two of the rectangles overlap with each other.

=========================================
Check if 4 unique points exist. If 4 unique points exist, then
check if the sum of all rectangles is equal to the final rectangle.
    Time Complexity:    O(N)
    Space Complexity:   O(N)
'''


############
# Solution #
############

def is_perfect_rectangle(rectangles):
    areas_sum = 0
    all_points = set()
    min_x = min_y = float('inf')
    max_x = max_y = float('-inf')

    for x1, y1, x2, y2 in rectangles:
        areas_sum += (x2 - x1) * (y2 - y1)
        
        min_x = min(min_x, x1)
        min_y = min(min_y, y1)
        max_x = max(max_x, x2)
        max_y = max(max_y, y2)

        for point in ((x1, y1), (x1, y2), (x2, y2), (x2, y1)):
            all_points.discard(point) if point in all_points else all_points.add(point)

    return (len(all_points) == 4 and 
            all_points == {(min_x, min_y), (min_x, max_y), (max_x, max_y), (max_x, min_y)} and
            areas_sum == (max_x - min_x) * (max_y - min_y))