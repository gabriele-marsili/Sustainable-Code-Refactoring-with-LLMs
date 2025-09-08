def sort_rgb_array(arr):
    r, g, b = 0, 0, len(arr) - 1

    while g <= b:
        if arr[g] == 'R':
            arr[r], arr[g] = arr[g], arr[r]
            r += 1
            g += 1
        elif arr[g] == 'G':
            g += 1
        else:  # arr[g] == 'B'
            arr[g], arr[b] = arr[b], arr[g]
            b -= 1

    return arr

def sort_rgb_array_2(arr):
    r_count = arr.count('R')
    g_count = arr.count('G')
    b_count = len(arr) - r_count - g_count

    arr[:r_count] = ['R'] * r_count
    arr[r_count:r_count + g_count] = ['G'] * g_count
    arr[r_count + g_count:] = ['B'] * b_count

    return arr