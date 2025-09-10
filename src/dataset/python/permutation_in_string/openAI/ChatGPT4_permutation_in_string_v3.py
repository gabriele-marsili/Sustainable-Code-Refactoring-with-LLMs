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

        matches = sum(1 for i in range(26) if freq_s1[i] == freq_s2[i])

        if matches == 26:
            return True

        for right in range(len(s1), len(s2)):
            left_char = s2[right - len(s1)]
            right_char = s2[right]

            freq_s2[ord(right_char) - a_ord] += 1
            if freq_s2[ord(right_char) - a_ord] == freq_s1[ord(right_char) - a_ord]:
                matches += 1
            elif freq_s2[ord(right_char) - a_ord] - 1 == freq_s1[ord(right_char) - a_ord]:
                matches -= 1

            freq_s2[ord(left_char) - a_ord] -= 1
            if freq_s2[ord(left_char) - a_ord] == freq_s1[ord(left_char) - a_ord]:
                matches += 1
            elif freq_s2[ord(left_char) - a_ord] + 1 == freq_s1[ord(left_char) - a_ord]:
                matches -= 1

            if matches == 26:
                return True

        return False