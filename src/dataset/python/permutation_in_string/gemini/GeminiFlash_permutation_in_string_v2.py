class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        if len(s1) > len(s2):
            return False

        n1 = len(s1)
        n2 = len(s2)

        s1_count = [0] * 26
        s2_count = [0] * 26

        for char in s1:
            s1_count[ord(char) - ord('a')] += 1

        for i in range(n1):
            s2_count[ord(s2[i]) - ord('a')] += 1

        if s1_count == s2_count:
            return True

        for i in range(n1, n2):
            s2_count[ord(s2[i - n1]) - ord('a')] -= 1
            s2_count[ord(s2[i]) - ord('a')] += 1
            if s1_count == s2_count:
                return True

        return False