def longest_palindromic_substring(s):
    n = len(s)
    if n <= 1:
        return n

    longest = 1

    def expand_around_center(left, right):
        while left >= 0 and right < n and s[left] == s[right]:
            left -= 1
            right += 1
        return right - left - 1

    for i in range(n):
        # Check for odd-length palindromes
        len_odd = expand_around_center(i, i)
        # Check for even-length palindromes
        len_even = expand_around_center(i, i + 1)
        # Update the longest palindrome length
        longest = max(longest, len_odd, len_even)

    return longest