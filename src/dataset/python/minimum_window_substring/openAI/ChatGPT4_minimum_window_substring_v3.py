from collections import Counter, defaultdict

class Solution:
    def minWindow(self, s: str, t: str) -> str:
        if len(s) < len(t):
            return ""

        freq_t = Counter(t)
        freq_window = defaultdict(int)
        left = 0
        have = 0
        need = len(freq_t)
        min_len = float("inf")
        result = ""

        for right, c in enumerate(s):
            if c in freq_t:
                freq_window[c] += 1
                if freq_window[c] == freq_t[c]:
                    have += 1

            while have == need:
                window_len = right - left + 1
                if window_len < min_len:
                    min_len = window_len
                    result = s[left:right + 1]
                tmp = s[left]
                if tmp in freq_t:
                    freq_window[tmp] -= 1
                    if freq_window[tmp] < freq_t[tmp]:
                        have -= 1
                left += 1

        return result