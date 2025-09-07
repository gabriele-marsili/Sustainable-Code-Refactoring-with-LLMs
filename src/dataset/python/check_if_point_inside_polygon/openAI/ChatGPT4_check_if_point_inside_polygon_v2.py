def check_if_point_inside_polygon(polygon, p):
    n = len(polygon)
    is_inside = False
    prev_x, prev_y = polygon[-1]

    for curr_x, curr_y in polygon:
        if (prev_y > p[1]) != (curr_y > p[1]):
            x_intersect = (p[1] - prev_y) * (curr_x - prev_x) / (curr_y - prev_y) + prev_x
            if x_intersect <= p[0]:
                is_inside = not is_inside
        prev_x, prev_y = curr_x, curr_y

    return is_inside