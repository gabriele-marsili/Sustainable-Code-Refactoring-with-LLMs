'''
Group Anagrams

Given an array of strings, group anagrams together.
(An anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once)

Input: ['eat', 'tea', 'tan', 'ate', 'nat', 'bat']
Output: [['eat', 'ate', 'tea'], ['tan', 'nat'], ['bat']]

=========================================
This problem can be solved using a dictionary (hash map), but in order to use a dictinary you'll need to find
a way to calculate the keys for all strings. This is a same solution but 2 different hash functions.

Sort the letters from the strings, and use the sorted letters as key.
    Time Complexity:    O(N * KLogK)    , N = number of strings, K = number of characters (chars in the string with most chars)
    Space Complexity:   O(N)
Use a letter counter (some kind of counting sort).
    Time Complexity:    O(N * K)    , O(N * K * 26) = O(N * K), if all of the strings have several chars (less than ~8) the first hash function is better.
    Space Complexity:   O(N)
'''


############
# Solution #
############

def group_anagrams(strs):
    anagrams = {}

    for st in strs:
        key = tuple(sorted(st))

        if key not in anagrams:
            anagrams[key] = []
        anagrams[key].append(st)

    return list(anagrams.values())

def hash_1(st):
    chars = list(st)
    chars.sort()
    return tuple(chars)

def hash_2(st):
    all_letters = [0]*26
    ord_a = 97 # ord('a')
    for c in st:
        all_letters[ord(c) - ord_a] += 1
    return tuple(all_letters)