def reverse_words_in_sentence(sentence):
    arr = list(sentence)
    n = len(arr)
    start = 0

    # reverse all words and the whole sentence in one pass
    for i in range(n + 1):
        if i == n or arr[i] == ' ':
            reverse_array(arr, start, i - 1)
            start = i + 1

    # reverse the whole sentence
    arr.reverse()

    return ''.join(arr)

def reverse_array(arr, start, end):
    while start < end:
        arr[start], arr[end] = arr[end], arr[start]
        start += 1
        end -= 1