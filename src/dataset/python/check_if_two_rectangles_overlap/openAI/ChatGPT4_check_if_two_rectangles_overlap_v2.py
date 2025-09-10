def check_if_two_rectangles_overlap(l1, r1, l2, r2):
    # Check if one rectangle is to the left or right of the other
    if r1[0] <= l2[0] or r2[0] <= l1[0]:
        return False

    # Check if one rectangle is above or below the other
    if r1[1] <= l2[1] or r2[1] <= l1[1]:
        return False

    return True