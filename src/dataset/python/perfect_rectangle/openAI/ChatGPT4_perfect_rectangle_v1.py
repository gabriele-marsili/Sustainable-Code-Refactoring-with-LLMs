def is_perfect_rectangle(rectangles):
    areas_sum = 0
    all_points = set()
    min_x, min_y, max_x, max_y = float('inf'), float('inf'), float('-inf'), float('-inf')

    for x1, y1, x2, y2 in rectangles:
        # Sum the areas of all rectangles
        areas_sum += (x2 - x1) * (y2 - y1)

        # Update bounding rectangle coordinates
        min_x, min_y = min(min_x, x1), min(min_y, y1)
        max_x, max_y = max(max_x, x2), max(max_y, y2)

        # Toggle rectangle points in the set
        for point in [(x1, y1), (x1, y2), (x2, y2), (x2, y1)]:
            if point in all_points:
                all_points.remove(point)
            else:
                all_points.add(point)

    # Check if there are exactly 4 unique points
    if len(all_points) != 4 or all_points != {(min_x, min_y), (min_x, max_y), (max_x, max_y), (max_x, min_y)}:
        return False

    # Check if the total area matches the bounding rectangle area
    return areas_sum == (max_x - min_x) * (max_y - min_y)