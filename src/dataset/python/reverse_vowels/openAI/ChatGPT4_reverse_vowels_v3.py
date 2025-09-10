def reverse_vowels(sentence):
    vowels = set('aeiouAEIOU')
    arr = list(sentence)
    left, right = 0, len(arr) - 1

    while left < right:
        while left < right and arr[left] not in vowels:
            left += 1
        while left < right and arr[right] not in vowels:
            right -= 1
        if left < right:
            arr[left], arr[right] = arr[right], arr[left]
            left += 1
            right -= 1

    return ''.join(arr)