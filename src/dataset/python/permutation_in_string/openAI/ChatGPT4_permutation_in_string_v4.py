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

        left = 0
        for right in range(len(s1), len(s2)):
            r_idx = ord(s2[right]) - a_ord
            l_idx = ord(s2[left]) - a_ord

            freq_s2[r_idx] += 1
            if freq_s2[r_idx] == freq_s1[r_idx]:
                matches += 1
            elif freq_s2[r_idx] - 1 == freq_s1[r_idx]:
                matches -= 1

            freq_s2[l_idx] -= 1
            if freq_s2[l_idx] == freq_s1[l_idx]:
                matches += 1
            elif freq_s2[l_idx] + 1 == freq_s1[l_idx]:
                matches -= 1

            if matches == 26:
                return True

            left += 1

        return False