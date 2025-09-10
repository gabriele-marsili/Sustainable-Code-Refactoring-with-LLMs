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
    words = sentence.split()
    if len(words) < 2:
        return sentence
    words[0], words[-1] = words[-1], words[0]
    return ' '.join(words)