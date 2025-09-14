def swap_first_and_last_word(sentence):
    if not sentence or ' ' not in sentence:
        return sentence
    
    arr = list(sentence)
    n = len(arr)
    
    reverse_array(arr, 0, n - 1)
    
    first_space = 0
    while first_space < n and arr[first_space] != ' ':
        first_space += 1
    
    last_space = n - 1
    while last_space >= 0 and arr[last_space] != ' ':
        last_space -= 1
    
    reverse_array(arr, 0, first_space - 1)
    reverse_array(arr, last_space + 1, n - 1)
    reverse_array(arr, first_space + 1, last_space - 1)
    
    return ''.join(arr)

def reverse_array(arr, start, end):
    while start < end:
        arr[start], arr[end] = arr[end], arr[start]
        start += 1
        end -= 1