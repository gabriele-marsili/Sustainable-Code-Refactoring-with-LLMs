class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        if len(s2) < len(s1):
            return False

        freq_s1 = [0] * 26
        freq_s2 = [0] * 26
        a_ord = ord('a')

        for char in s1:
            freq_s1[ord(char) - a_ord] += 1

        for char in s2[:len(s1)]:
            freq_s2[ord(char) - a_ord] += 1

        if freq_s1 == freq_s2:
            return True

        for right in range(len(s1), len(s2)):
            freq_s2[ord(s2[right]) - a_ord] += 1
            freq_s2[ord(s2[right - len(s1)]) - a_ord] -= 1
            if freq_s1 == freq_s2:
                return True

        return False