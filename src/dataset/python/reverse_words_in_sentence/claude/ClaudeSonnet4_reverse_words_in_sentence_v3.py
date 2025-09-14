def reverse_words_in_sentence(sentence):
    if not sentence:
        return sentence
    
    arr = list(sentence)
    n = len(arr)
    start = 0
    
    for i in range(n + 1):
        if i == n or arr[i] == ' ':
            end = i - 1
            while start < end:
                arr[start], arr[end] = arr[end], arr[start]
                start += 1
                end -= 1
            start = i + 1
    
    start, end = 0, n - 1
    while start < end:
        arr[start], arr[end] = arr[end], arr[start]
        start += 1
        end -= 1
    
    return ''.join(arr)

def reverse_array(arr, start, end):
    while start < end:
        arr[start], arr[end] = arr[end], arr[start]
        start += 1
        end -= 1