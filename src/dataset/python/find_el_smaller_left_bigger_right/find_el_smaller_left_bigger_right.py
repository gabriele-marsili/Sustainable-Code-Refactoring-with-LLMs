def find_element_smaller_left_bigger_right(arr):
    n = len(arr)
    curr_max = arr[0]
    result = -1
    for i in range(1, n):
        curr_el = arr[i]
        if result == -1 and curr_el >= curr_max and i != n - 1:
            result = curr_el
        elif curr_el < result:
            result = -1
        if curr_el > curr_max:
            curr_max = curr_el
    return result