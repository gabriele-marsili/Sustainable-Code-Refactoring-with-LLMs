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
    if n <= 1:
        return n

    longest = 1

    for i in range(n):
        # search for palindrom with odd number of chars
        l, r = i - 1, i + 1
        count_odd = 1
        while l >= 0 and r < n and s[l] == s[r]:
            count_odd += 2
            l -= 1
            r += 1

        # search for palindrom with even number of chars
        l, r = i - 1, i
        count_even = 0
        while l >= 0 and r < n and s[l] == s[r]:
            count_even += 2
            l -= 1
            r += 1

        # save the longest
        longest = max(longest, count_odd, count_even)

    return longest