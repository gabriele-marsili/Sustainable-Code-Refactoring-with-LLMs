def check_if_point_inside_polygon(polygon, p):
    n = len(polygon)
    is_inside = False
    px, py = p
    
    j = n - 1
    for i in range(n):
        xi, yi = polygon[i]
        xj, yj = polygon[j]
        
        if ((yi > py) != (yj > py)) and (px < (xj - xi) * (py - yi) / (yj - yi) + xi):
            is_inside = not is_inside
        j = i
    
    return is_inside

def intersect(a, b, p):
    if (a[1] > p[1]) != (b[1] > p[1]):
        x_intersect = (p[1] - a[1]) * (b[0] - a[0]) / (b[1] - a[1]) + a[0]
        return x_intersect >= p[0]
    return False