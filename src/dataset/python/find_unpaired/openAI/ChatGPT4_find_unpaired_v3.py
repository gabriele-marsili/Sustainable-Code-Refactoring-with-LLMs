def find_unpaired_element(arr):
    from functools import reduce
    return reduce(lambda x, y: x ^ y, arr)