from typing import List

class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        wordSet = set(wordDict)  # Use a set for O(1) lookups
        n = len(s)
        ok = [False] * (n + 1)
        ok[0] = True  # Base case: empty string is always valid
        
        for i in range(1, n + 1):
            for j in range(i - 1, -1, -1):  # Iterate backwards to break early
                if ok[j] and s[j:i] in wordSet:
                    ok[i] = True
                    break  # No need to check further once a valid segmentation is found
        return ok[n]