class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        if len(s1) > len(s2):
            return False

        n = len(s1)
        s1_count = [0] * 26
        s2_count = [0] * 26

        for char in s1:
            s1_count[ord(char) - ord('a')] += 1

        for i in range(n):
            s2_count[ord(s2[i]) - ord('a')] += 1

        matches = 0
        for i in range(26):
            if s1_count[i] == s2_count[i]:
                matches += 1

        for i in range(n, len(s2)):
            if matches == 26:
                return True

            index = ord(s2[i]) - ord('a')
            s2_count[index] += 1
            if s1_count[index] == s2_count[index]:
                matches += 1
            elif s1_count[index] + 1 == s2_count[index]:
                matches -= 1

            index = ord(s2[i - n]) - ord('a')
            s2_count[index] -= 1
            if s1_count[index] == s2_count[index]:
                matches += 1
            elif s1_count[index] - 1 == s2_count[index]:
                matches -= 1

        return matches == 26