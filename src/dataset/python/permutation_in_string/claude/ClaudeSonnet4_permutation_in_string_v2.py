class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        if len(s2) < len(s1):
            return False
        
        s1_len = len(s1)
        
        # Use arrays instead of Counter for better performance
        s1_count = [0] * 26
        window_count = [0] * 26
        
        # Count characters in s1 and initial window
        for i in range(s1_len):
            s1_count[ord(s1[i]) - ord('a')] += 1
            window_count[ord(s2[i]) - ord('a')] += 1
        
        if s1_count == window_count:
            return True
        
        # Slide the window
        for i in range(s1_len, len(s2)):
            # Remove leftmost character
            window_count[ord(s2[i - s1_len]) - ord('a')] -= 1
            # Add rightmost character
            window_count[ord(s2[i]) - ord('a')] += 1
            
            if s1_count == window_count:
                return True
        
        return False