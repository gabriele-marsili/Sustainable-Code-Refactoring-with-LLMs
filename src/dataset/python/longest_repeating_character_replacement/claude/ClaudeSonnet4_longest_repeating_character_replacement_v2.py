class Solution:
    def characterReplacement(self, s: str, k: int) -> int:
        count = [0] * 26
        left = 0
        max_count = 0
        ans = 0
        
        for right in range(len(s)):
            char_index = ord(s[right]) - 65
            count[char_index] += 1
            max_count = max(max_count, count[char_index])
            
            if (right - left + 1) - max_count > k:
                count[ord(s[left]) - 65] -= 1
                left += 1
            
            ans = max(ans, right - left + 1)
        
        return ans