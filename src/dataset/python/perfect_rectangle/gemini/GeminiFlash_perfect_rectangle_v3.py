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
    points_count = {}
    min_x, min_y = float('inf'), float('inf')
    max_x, max_y = float('-inf'), float('-inf')

    for rect in rectangles:
        x1, y1, x2, y2 = rect
        areas_sum += (x2 - x1) * (y2 - y1)

        min_x = min(min_x, x1)
        min_y = min(min_y, y1)
        max_x = max(max_x, x2)
        max_y = max(max_y, y2)

        points = [(x1, y1), (x1, y2), (x2, y1), (x2, y2)]
        for point in points:
            points_count[point] = points_count.get(point, 0) + 1

    if len(points_count) != 4 + (len(rectangles) * 4 - 4):
        unique_corners = 0
        for count in points_count.values():
            if count % 2 != 0:
                unique_corners += 1
        if unique_corners != 4:
            return False

    expected_area = (max_x - min_x) * (max_y - min_y)
    
    corners = [(min_x, min_y), (min_x, max_y), (max_x, min_y), (max_x, max_y)]
    corner_count = 0
    for corner in corners:
        if points_count.get(corner, 0) != 1:
            return False
        corner_count += 1

    if corner_count != 4:
        return False

    return areas_sum == expected_area