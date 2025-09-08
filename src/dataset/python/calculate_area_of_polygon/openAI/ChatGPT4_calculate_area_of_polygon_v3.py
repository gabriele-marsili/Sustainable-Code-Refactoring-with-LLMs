def calculate_area_of_polygon(polygon):
    area = sum((polygon[i - 1][0] + polygon[i][0]) * (polygon[i - 1][1] - polygon[i][1]) for i in range(len(polygon)))
    return abs(area * 0.5)