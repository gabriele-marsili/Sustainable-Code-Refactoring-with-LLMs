from collections import Counter

class Solution(object):
    def canConstruct(self, ransomNote, magazine):
        """
        :type ransomNote: str
        :type magazine: str
        :rtype: bool
        """
        magazine_count = Counter(magazine)
        ransom_count = Counter(ransomNote)
        return all(ransom_count[c] <= magazine_count[c] for c in ransom_count)