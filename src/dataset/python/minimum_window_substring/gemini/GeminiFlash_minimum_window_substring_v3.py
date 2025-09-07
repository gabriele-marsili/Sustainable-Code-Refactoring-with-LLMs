import collections


class Solution:
    def minWindow(self, s: str, t: str) -> str:
        if not s or not t:
            return ""

        t_count = collections.Counter(t)
        window_count = {}
        required = len(t_count)
        formed = 0
        left = 0
        right = 0
        window_start = 0
        window_length = float('inf')

        while right < len(s):
            character = s[right]
            window_count[character] = window_count.get(character, 0) + 1

            if character in t_count and window_count[character] == t_count[character]:
                formed += 1

            while left <= right and formed == required:
                character = s[left]

                if right - left + 1 < window_length:
                    window_length = right - left + 1
                    window_start = left

                window_count[character] -= 1
                if character in t_count and window_count[character] < t_count[character]:
                    formed -= 1

                left += 1
            right += 1

        return "" if window_length == float('inf') else s[window_start: window_start + window_length]