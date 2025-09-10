def is_perfect_rectangle(rectangles):
    areas_sum = 0
    point_counts = {}

    for rect in rectangles:
        # Sum the areas of all rectangles
        areas_sum += (rect[2] - rect[0]) * (rect[3] - rect[1])

        # Define rectangle points
        rect_points = [
            (rect[0], rect[1]),   # bottom-left
            (rect[0], rect[3]),   # top-left
            (rect[2], rect[3]),   # top-right
            (rect[2], rect[1])    # bottom-right
        ]

        # Track point occurrences
        for point in rect_points:
            point_counts[point] = point_counts.get(point, 0) + 1

    # Filter points with odd occurrences (unique points of the bounding rectangle)
    unique_points = [point for point, count in point_counts.items() if count % 2 == 1]

    # A perfect rectangle must have exactly 4 unique points
    if len(unique_points) != 4:
        return False

    # Determine the bounding rectangle coordinates
    min_x = min(point[0] for point in unique_points)
    min_y = min(point[1] for point in unique_points)
    max_x = max(point[0] for point in unique_points)
    max_y = max(point[1] for point in unique_points)

    # Calculate the area of the bounding rectangle
    bounding_rectangle_area = (max_x - min_x) * (max_y - min_y)

    # Check if the total area matches the bounding rectangle area
    return areas_sum == bounding_rectangle_area