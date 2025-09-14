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
    
    # Find first and last word boundaries directly
    first_space = sentence.find(' ')
    last_space = sentence.rfind(' ')
    
    # Extract words and middle part
    first_word = sentence[:first_space]
    last_word = sentence[last_space + 1:]
    middle = sentence[first_space:last_space + 1]
    
    # Concatenate in swapped order
    return last_word + middle + first_word

def reverse_array(arr, start, end):
    # reverse the array from the start index to the end index
    while start < end:
        arr[start], arr[end] = arr[end], arr[start] # swap
        start += 1
        end -= 1