class Solution(object):
    def canConstruct(self, ransomNote, magazine):
        """
        :type ransomNote: str
        :type magazine: str
        :rtype: bool
        """
        from collections import Counter

        magazine_count = Counter(magazine)
        ransom_count = Counter(ransomNote)

        for char, count in ransom_count.items():
            if magazine_count[char] < count:
                return False
        return True