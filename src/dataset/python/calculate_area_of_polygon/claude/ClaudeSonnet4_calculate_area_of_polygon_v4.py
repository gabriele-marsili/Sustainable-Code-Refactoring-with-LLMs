def calculate_area_of_polygon(polygon):
    if not polygon:
        return 0.0
    
    n = len(polygon)
    if n < 3:
        return 0.0
    
    area = 0.0
    prev_x, prev_y = polygon[-1]
    
    for curr_x, curr_y in polygon:
        area += (prev_x + curr_x) * (prev_y - curr_y)
        prev_x, prev_y = curr_x, curr_y
    
    return abs(area * 0.5)