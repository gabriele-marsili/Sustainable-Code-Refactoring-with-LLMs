class Solution(object):
    def canConstruct(self, ransomNote, magazine):
        """
        :type ransomNote: str
        :type magazine: str
        :rtype: bool
        """
        from collections import Counter

        magazine_counts = Counter(magazine)
        ransomNote_counts = Counter(ransomNote)

        for char, count in ransomNote_counts.items():
            if magazine_counts[char] < count:
                return False

        return True