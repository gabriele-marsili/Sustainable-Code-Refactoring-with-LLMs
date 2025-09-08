class Solution(object):
    def canConstruct(self, ransomNote, magazine):
        """
        :type ransomNote: str
        :type magazine: str
        :rtype: bool
        """
        if len(ransomNote) > len(magazine):
            return False
        
        count_l = [0] * 26
        ord_a = ord("a")
        
        for c in magazine:
            count_l[ord(c) - ord_a] += 1
        
        for c in ransomNote:
            idx_c = ord(c) - ord_a
            if count_l[idx_c] == 0:
                return False
            count_l[idx_c] -= 1
        
        return True