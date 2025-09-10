def swap_first_and_last_word(sentence):
    arr = list(sentence)
    n = len(arr)

    # Reverse the entire array
    reverse_array(arr, 0, n - 1)

    # Find the first space
    first_space = arr.index(' ')

    # Find the last space
    last_space = n - 1 - arr[::-1].index(' ')

    # Reverse the first word
    reverse_array(arr, 0, first_space - 1)
    # Reverse the last word
    reverse_array(arr, last_space + 1, n - 1)
    # Reverse everything in between
    reverse_array(arr, first_space + 1, last_space - 1)

    return ''.join(arr)

def reverse_array(arr, start, end):
    while start < end:
        arr[start], arr[end] = arr[end], arr[start]
        start += 1
        end -= 1