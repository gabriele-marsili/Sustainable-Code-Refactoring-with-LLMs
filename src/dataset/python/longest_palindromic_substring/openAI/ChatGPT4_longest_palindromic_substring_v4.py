def longest_palindromic_substring(s):
    n = len(s)
    longest = 1

    for i in range(n):
        longest = max(longest, expand_around_center(s, i, i), expand_around_center(s, i, i + 1))

    return longest

def expand_around_center(s, left, right):
    while left >= 0 and right < len(s) and s[left] == s[right]:
        left -= 1
        right += 1
    return right - left - 1