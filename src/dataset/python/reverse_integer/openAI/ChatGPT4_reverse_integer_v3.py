def reverse_integer(x):
    if x == 0:
        return 0

    sign = -1 if x < 0 else 1
    x = abs(x)

    res = int(str(x)[::-1])
    return res * sign