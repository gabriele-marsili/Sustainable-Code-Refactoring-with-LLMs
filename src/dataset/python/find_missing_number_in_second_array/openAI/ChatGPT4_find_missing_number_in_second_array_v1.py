def find_missing_number(arr1, arr2):
    mod = 10000  # Ensure max_length * mod < max_integer
    sum_diff = sum(a % mod for a in arr1) - sum(b % mod for b in arr2)
    mod_diff = sum(a // mod for a in arr1) - sum(b // mod for b in arr2)
    return mod * mod_diff + sum_diff


def find_missing_number_2(arr1, arr2):
    from functools import reduce
    return reduce(lambda x, y: x ^ y, arr1 + arr2)