class Solution:
    def numDecodings(self, s: str) -> int:
        if not s or s[0] == '0':
            return 0

        prev, curr = 1, 1

        for i in range(1, len(s)):
            temp = curr
            if s[i] == '0':
                if s[i - 1] in {'1', '2'}:
                    curr = prev
                else:
                    return 0
            elif 10 <= int(s[i - 1:i + 1]) <= 26:
                curr += prev
            prev = temp

        return curr