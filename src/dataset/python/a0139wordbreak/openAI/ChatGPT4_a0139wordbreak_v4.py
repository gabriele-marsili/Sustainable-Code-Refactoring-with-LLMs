from typing import List


class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        wordSet = set(wordDict)
        n = len(s)
        ok = [False] * (n + 1)
        ok[0] = True
        for i in range(1, n + 1):
            for j in range(i - 1, -1, -1):
                if ok[j] and s[j:i] in wordSet:
                    ok[i] = True
                    break
        return ok[n]