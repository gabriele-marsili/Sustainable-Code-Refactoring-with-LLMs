class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        if len(s2) < len(s1):
            return False
        
        s1_len = len(s1)
        char_count = [0] * 26
        
        for char in s1:
            char_count[ord(char) - ord('a')] += 1
        
        window_count = [0] * 26
        
        for i in range(s1_len):
            window_count[ord(s2[i]) - ord('a')] += 1
        
        if char_count == window_count:
            return True
        
        for i in range(s1_len, len(s2)):
            window_count[ord(s2[i - s1_len]) - ord('a')] -= 1
            window_count[ord(s2[i]) - ord('a')] += 1
            
            if char_count == window_count:
                return True
        
        return False