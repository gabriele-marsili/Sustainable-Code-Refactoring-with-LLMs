class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False
        
        char_count = {}
        for c in s:
            char_count[c] = char_count.get(c, 0) + 1
        
        for c in t:
            if c not in char_count:
                return False
            char_count[c] -= 1
            if char_count[c] == 0:
                del char_count[c]
        
        return len(char_count) == 0