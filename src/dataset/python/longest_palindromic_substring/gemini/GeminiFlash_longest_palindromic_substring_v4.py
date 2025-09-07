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
    start = 0

    for i in range(n):
        # Odd length palindromes
        l, r = i - 1, i + 1
        while l >= 0 and r < n and s[l] == s[r]:
            if (r - l + 1) > longest:
                longest = r - l + 1
                start = l
            l -= 1
            r += 1

        # Even length palindromes
        l, r = i, i + 1
        while l >= 0 and r < n and s[l] == s[r]:
            if (r - l + 1) > longest:
                longest = r - l + 1
                start = l
            l -= 1
            r += 1

    return longest

def compare_both_sides(s, count, left, right):
    # helper method to avoid duplicate code
    n = len(s)

    while (left >= 0) and (right < n) and (s[left] == s[right]):
        count += 2
        left -= 1
        right += 1

    return count