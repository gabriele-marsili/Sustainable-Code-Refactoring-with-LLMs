def check_if_point_inside_polygon(polygon, p):
    n = len(polygon)
    prev = polygon[-1]
    is_inside = False

    for curr in polygon:
        if (prev[1] > p[1]) != (curr[1] > p[1]) and p[0] <= (p[1] - prev[1]) * (curr[0] - prev[0]) / (curr[1] - prev[1]) + prev[0]:
            is_inside = not is_inside
        prev = curr

    return is_inside