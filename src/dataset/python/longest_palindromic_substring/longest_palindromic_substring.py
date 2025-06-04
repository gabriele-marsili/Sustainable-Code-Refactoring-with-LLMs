'''
Longest Palindromic Substring

Find the length of the longest palindromic substring.

Input: 'google'
Output: 4

=========================================
Simple algorithm, for each position compare left and right side and count the length of matching.
    Time Complexity:    O(N^2)
    Space Complexity:   O(1)
* For this problem exists a faster algorithm, called Manchester's Algorithm. Time Complexity O(N) and Space Complexity O(N).
'''


############
# Solution #
############

def longest_palindromic_substring(s):
    n = len(s)
    longest = 1

    for i in range(n):
        # search for palindrom with odd number of chars
        count_odd = compare_both_sides(s, 1, i - 1, i + 1)

        # search for palindrom with even number of chars
        count_even = compare_both_sides(s, 0, i - 1, i)

        # save the longest
        longest = max(longest, count_odd, count_even)

    return longest

def compare_both_sides(s, count, left, right):
    # helper method to avoid duplicate code
    n = len(s)

    while (left >= 0) and (right < n) and (s[left] == s[right]):
        count += 2
        left -= 1
        right += 1

    return count