class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False
        
        s_counts = {}
        t_counts = {}

        for char in s:
            s_counts[char] = s_counts.get(char, 0) + 1
        
        for char in t:
            t_counts[char] = t_counts.get(char, 0) + 1
        
        return s_counts == t_counts