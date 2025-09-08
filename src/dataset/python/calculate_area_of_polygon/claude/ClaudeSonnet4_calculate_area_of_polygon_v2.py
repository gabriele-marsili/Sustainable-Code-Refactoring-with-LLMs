'''
Calculate Area of Polygon

Given ordered coordinates of a polygon with n vertices. Find area of the polygon.
Here ordered mean that the coordinates are given either in clockwise manner or anticlockwise from first vertex to last.

Input: [(0, 0), (3, 0), (3, 2), (0, 2)]
Output: 6.0
Output explanation: The polygon is a 3x2 rectangle parallel with the X axis. The area is 6 (3*2).

=========================================
Use Shoelace formula (https://en.wikipedia.org/wiki/Shoelace_formula).
abs( 1/2 ((X1Y2 + X2Y3 + ... + Xn-1Yn + XnY1) - (X2Y1 + X3Y2 + ... + XnYn-1 + X1Yn)) )
    Time Complexity:    O(N)
    Space Complexity:   O(1)
'''


############
# Solution #
############

def calculate_area_of_polygon(polygon):
    if len(polygon) < 3:
        return 0.0
    
    area = 0
    prev_x, prev_y = polygon[-1]
    
    for curr_x, curr_y in polygon:
        area += (prev_x + curr_x) * (prev_y - curr_y)
        prev_x, prev_y = curr_x, curr_y
    
    return abs(area) * 0.5