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

from collections import defaultdict

def group_anagrams(strs):
    anagrams = defaultdict(list)

    for st in strs:
        hashable_object = hash_2(st)
        anagrams[hashable_object].append(st)

    return list(anagrams.values())

def hash_1(st):
    return tuple(sorted(st))

def hash_2(st):
    all_letters = [0] * 26
    for c in st:
        all_letters[ord(c) - ord('a')] += 1
    return tuple(all_letters)