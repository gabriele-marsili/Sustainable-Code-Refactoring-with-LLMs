import collections


class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        if len(s2) < len(s1):
            return False

        s1_len = len(s1)
        freq_s1 = collections.Counter(s1)
        freq_s2 = collections.Counter()
        
        for i in range(s1_len):
            freq_s2[s2[i]] += 1
        
        if freq_s1 == freq_s2:
            return True

        for right in range(s1_len, len(s2)):
            left_char = s2[right - s1_len]
            right_char = s2[right]
            
            freq_s2[left_char] -= 1
            if freq_s2[left_char] == 0:
                del freq_s2[left_char]
            
            freq_s2[right_char] += 1
            
            if freq_s1 == freq_s2:
                return True

        return False