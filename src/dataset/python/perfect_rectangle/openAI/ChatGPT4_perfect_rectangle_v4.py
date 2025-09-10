def is_perfect_rectangle(rectangles):
    areas_sum = 0
    all_points = set()
    min_x, min_y, max_x, max_y = float('inf'), float('inf'), float('-inf'), float('-inf')

    for x1, y1, x2, y2 in rectangles:
        areas_sum += (x2 - x1) * (y2 - y1)

        rect_points = [
            (x1, y1), (x1, y2), (x2, y2), (x2, y1)
        ]

        for point in rect_points:
            if point in all_points:
                all_points.remove(point)
            else:
                all_points.add(point)

        min_x, min_y = min(min_x, x1), min(min_y, y1)
        max_x, max_y = max(max_x, x2), max(max_y, y2)

    if len(all_points) != 4 or (min_x, min_y) not in all_points or (min_x, max_y) not in all_points or (max_x, max_y) not in all_points or (max_x, min_y) not in all_points:
        return False

    return areas_sum == (max_x - min_x) * (max_y - min_y)