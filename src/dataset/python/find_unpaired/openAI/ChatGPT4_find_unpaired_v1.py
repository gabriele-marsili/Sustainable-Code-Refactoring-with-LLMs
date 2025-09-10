def find_unpaired_element(arr):
    return reduce(lambda x, y: x ^ y, arr)