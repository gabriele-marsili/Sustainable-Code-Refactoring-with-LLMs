def reverse_words_in_sentence(sentence):
    arr = list(sentence)
    n = len(arr)
    start = 0

    def reverse_array_in_place(start, end):
        while start < end:
            arr[start], arr[end] = arr[end], arr[start]
            start += 1
            end -= 1

    for i in range(n + 1):
        if i == n or arr[i] == ' ':
            reverse_array_in_place(start, i - 1)
            start = i + 1

    reverse_array_in_place(0, n - 1)
    return ''.join(arr)