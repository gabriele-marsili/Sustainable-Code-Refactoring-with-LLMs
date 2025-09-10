def find_unpaired_element(arr):
    result = 0
    for number in arr:
        result ^= number
    return result