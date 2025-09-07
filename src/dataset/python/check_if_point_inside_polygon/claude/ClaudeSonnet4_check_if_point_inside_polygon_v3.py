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
    px, py = p
    is_inside = False
    j = len(polygon) - 1
    
    for i in range(len(polygon)):
        xi, yi = polygon[i]
        xj, yj = polygon[j]
        
        if ((yi > py) != (yj > py)) and (px < (xj - xi) * (py - yi) / (yj - yi) + xi):
            is_inside = not is_inside
        j = i
    
    return is_inside

def intersect(a, b, p):
    ax, ay = a
    bx, by = b
    px, py = p
    
    if (ay > py) != (by > py):
        x_intersect = (py - ay) * (bx - ax) / (by - ay) + ax
        return x_intersect >= px
    
    return False