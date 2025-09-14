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
            areas_sum == (max_x - min_x) * (max_y - min_y))