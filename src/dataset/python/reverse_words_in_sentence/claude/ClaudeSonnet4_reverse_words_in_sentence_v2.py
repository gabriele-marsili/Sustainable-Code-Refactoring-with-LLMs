'''
Reverse words in sentence

Reverse words in a given string, in linear time complexity.

Input: 'i like this program very much'
Output: 'much very program this like i'

Input: 'how are you'
Output: 'you are how'

=========================================
First, find each word and reverse it (in place, by swapping the letters),
after all words are reversed, reverse the whole sentence (in place, by swapping the letters)
and the first word will be last and will be in the original form.
In Python, the string manipulation operations are too slow (string is immutable), because of that we need to convert the string into array.
In C/C++, the Space complexity will be O(1) (because the strings are just arrays with chars).
    Time Complexity:    O(N)
    Space Complexity:   O(N)
'''


############
# Solution #
############

def reverse_words_in_sentence(sentence):
    if not sentence:
        return sentence
    
    arr = list(sentence)
    n = len(arr)
    start = 0

    # reverse all words
    for i in range(n + 1):
        if i == n or arr[i] == ' ':
            # reverse current word
            end = i - 1
            while start < end:
                arr[start], arr[end] = arr[end], arr[start]
                start += 1
                end -= 1
            start = i + 1
    
    # reverse the whole sentence
    start, end = 0, n - 1
    while start < end:
        arr[start], arr[end] = arr[end], arr[start]
        start += 1
        end -= 1

    return ''.join(arr)

def reverse_array(arr, start, end):
    # reverse the array from the start index to the end index
    while start < end:
        arr[start], arr[end] = arr[end], arr[start] # swap
        start += 1
        end -= 1