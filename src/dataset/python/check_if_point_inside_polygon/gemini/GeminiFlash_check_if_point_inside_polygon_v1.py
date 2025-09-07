'''
Check if Point is Inside Polygon

Given a polygon (created by counterclockwise ordered points, more than 2 points) and a point "p", find if "p" lies inside the polygon or not.
The points lying on the border are considered inside.

Input: [(0, 0), (3, 0), (3, 2), (0, 2)], (1, 1)
Output: True
Output explanation: The polygon is a 3x2 rectangle parallel with the X axis.

=========================================
To check if a point is inside a polygon you'll need to draw a straight line (in any of the 4 directions: up, right, down, left),
and count the number of times the line intersects with polygon edges. If the number of intersections is odd then the point
is inside or lies on an edge of the polygon, otherwise the point is outside.
    Time Complexity:    O(N)
    Space Complexity:   O(1)
'''


############
# Solution #
############

def check_if_point_inside_polygon(polygon, p):
    n = len(polygon)
    is_inside = False

    for i in range(n):
        p1 = polygon[i]
        p2 = polygon[(i + 1) % n]

        if ((p1[1] > p[1]) != (p2[1] > p[1])) and (p[0] < (p2[0] - p1[0]) * (p[1] - p1[1]) / (p2[1] - p1[1]) + p1[0]):
            is_inside = not is_inside

    return is_inside