def check_if_two_rectangles_overlap(l1, r1, l2, r2):
    return not (r1[0] < l2[0] or l1[0] > r2[0] or r1[1] < l2[1] or l1[1] > r2[1])