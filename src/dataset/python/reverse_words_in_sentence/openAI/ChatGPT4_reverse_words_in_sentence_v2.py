def reverse_words_in_sentence(sentence):
    arr = list(sentence)
    n = len(arr)
    start = 0

    # Helper function to reverse array in place
    def reverse_array(start, end):
        while start < end:
            arr[start], arr[end] = arr[end], arr[start]
            start += 1
            end -= 1

    # Reverse all words and the entire sentence in one pass
    for i in range(n + 1):
        if i == n or arr[i] == ' ':
            reverse_array(start, i - 1)
            start = i + 1

    # Reverse the entire sentence
    reverse_array(0, n - 1)

    return ''.join(arr)