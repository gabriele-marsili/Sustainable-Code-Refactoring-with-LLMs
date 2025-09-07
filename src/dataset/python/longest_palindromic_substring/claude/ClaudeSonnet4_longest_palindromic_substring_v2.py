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
    if not s:
        return 0
    
    n = len(s)
    if n == 1:
        return 1
    
    longest = 1

    for i in range(n - 1):
        # search for palindrom with odd number of chars
        left, right = i - 1, i + 1
        count_odd = 1
        while left >= 0 and right < n and s[left] == s[right]:
            count_odd += 2
            left -= 1
            right += 1

        # search for palindrom with even number of chars
        left, right = i, i + 1
        count_even = 0
        while left >= 0 and right < n and s[left] == s[right]:
            count_even += 2
            left -= 1
            right += 1

        # save the longest
        current_max = max(count_odd, count_even)
        if current_max > longest:
            longest = current_max

    return longest

def compare_both_sides(s, count, left, right):
    # helper method to avoid duplicate code
    n = len(s)

    while (left >= 0) and (right < n) and (s[left] == s[right]):
        count += 2
        left -= 1
        right += 1

    return count