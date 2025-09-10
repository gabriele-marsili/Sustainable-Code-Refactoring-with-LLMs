def reverse_all_lists(arr):
    stack = [arr]

    while stack:
        inner_arr = stack.pop()

        # in place reverse
        inner_arr.reverse()

        # take all inner lists and save them for later
        stack.extend(item for item in inner_arr if isinstance(item, list))

    return arr

def reverse_arr(arr):
    arr.reverse()
    return arr