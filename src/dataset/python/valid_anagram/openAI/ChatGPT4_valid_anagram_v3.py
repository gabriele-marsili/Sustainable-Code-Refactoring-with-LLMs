class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False
        count = [0] * 26
        offset = ord('a')
        for cs, ct in zip(s, t):
            count[ord(cs) - offset] += 1
            count[ord(ct) - offset] -= 1
        return all(c == 0 for c in count)