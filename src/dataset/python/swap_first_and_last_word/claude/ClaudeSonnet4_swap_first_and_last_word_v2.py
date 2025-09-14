'''
Swap the frst and the last word

Given an string, you need to swap the first and last word in linear time.
Everything between should stay in same order.

Sample input: 'i like this program very much'
Sample output: 'much like this program very i'

=========================================
Reverse the whole string, after that reverse only first and only last word,
in the end reverse everything between first and last word. (using IN-PLACE reversing)
In Python, the string manipulation operations are too slow (string is immutable), because of that we need to convert the string into array.
In C/C++, the Space complexity will be O(1) (because the strings are just arrays with chars).
    Time complexity:    O(N)    , O(N + N) = O(2 * N) = O(N)
    Space Complexity:   O(N)
'''


############
# Solution #
############

def swap_first_and_last_word(sentence):
    if not sentence or ' ' not in sentence:
        return sentence
    
    arr = list(sentence)
    n = len(arr)
    
    # reverse the whole array
    reverse_array(arr, 0, n - 1)

    # find first space
    first_space = 0
    while first_space < n and arr[first_space] != ' ':
        first_space += 1

    # find last space
    last_space = n - 1
    while last_space >= 0 and arr[last_space] != ' ':
        last_space -= 1

    # reverse first word
    reverse_array(arr, 0, first_space - 1)
    # reverse last word
    reverse_array(arr, last_space + 1, n - 1)
    # reverse middle section
    if first_space + 1 <= last_space - 1:
        reverse_array(arr, first_space + 1, last_space - 1)

    return ''.join(arr)

def reverse_array(arr, start, end):
    while start < end:
        arr[start], arr[end] = arr[end], arr[start]
        start += 1
        end -= 1