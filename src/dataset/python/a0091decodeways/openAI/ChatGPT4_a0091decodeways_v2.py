class Solution:
    def numDecodings(self, s: str) -> int:
        if not s or s[0] == '0':
            return 0

        prev, curr = 1, 1  # prev = dp[i-2], curr = dp[i-1]

        for i in range(1, len(s)):
            temp = curr
            if s[i] == '0':
                if s[i - 1] in {'1', '2'}:
                    curr = prev  # Only valid as part of "10" or "20"
                else:
                    return 0
            elif 10 <= int(s[i - 1:i + 1]) <= 26:
                curr += prev  # Valid two-digit decode
            prev = temp

        return curr