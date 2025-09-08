def sort_rgb_array(arr):
    r, b = 0, len(arr) - 1
    i = 0

    while i <= b:
        if arr[i] == 'R':
            arr[i], arr[r] = arr[r], arr[i]
            r += 1
            i += 1
        elif arr[i] == 'B':
            arr[i], arr[b] = arr[b], arr[i]
            b -= 1
        else:
            i += 1

    return arr

def sort_rgb_array_2(arr):
    r_count = arr.count('R')
    g_count = arr.count('G')
    b_count = len(arr) - r_count - g_count

    arr[:r_count] = ['R'] * r_count
    arr[r_count:r_count + g_count] = ['G'] * g_count
    arr[r_count + g_count:] = ['B'] * b_count

    return arr