import collections


class Solution:
    def minWindow(self, s: str, t: str) -> str:
        if len(s) < len(t):
            return ""

        freq_t = collections.Counter(t)
        freq_window = {}
        left = 0
        have = 0
        need = len(freq_t)
        min_len = float("inf")
        min_left = 0

        for right in range(len(s)):
            c = s[right]
            if c in freq_t:
                freq_window[c] = freq_window.get(c, 0) + 1
                if freq_window[c] == freq_t[c]:
                    have += 1

            while have == need:
                window_len = right - left + 1
                if window_len < min_len:
                    min_len = window_len
                    min_left = left
                
                left_char = s[left]
                if left_char in freq_t:
                    freq_window[left_char] -= 1
                    if freq_window[left_char] < freq_t[left_char]:
                        have -= 1
                left += 1

        return s[min_left:min_left + min_len] if min_len != float("inf") else ""