class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        if len(s2) < len(s1):
            return False
        
        s1_len = len(s1)
        
        # Use arrays instead of Counter for better performance
        s1_count = [0] * 26
        s2_count = [0] * 26
        
        # Count characters in s1 and initial window of s2
        for i in range(s1_len):
            s1_count[ord(s1[i]) - ord('a')] += 1
            s2_count[ord(s2[i]) - ord('a')] += 1
        
        if s1_count == s2_count:
            return True
        
        # Sliding window
        for i in range(s1_len, len(s2)):
            # Remove leftmost character from window
            s2_count[ord(s2[i - s1_len]) - ord('a')] -= 1
            # Add new character to window
            s2_count[ord(s2[i]) - ord('a')] += 1
            
            if s1_count == s2_count:
                return True
        
        return False