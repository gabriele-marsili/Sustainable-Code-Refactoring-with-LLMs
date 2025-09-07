from typing import List
from functools import lru_cache

class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        wordSet = set(wordDict)
        maxWordLen = max(map(len, wordSet)) if wordSet else 0

        @lru_cache(None)
        def canBreak(start: int) -> bool:
            if start == len(s):
                return True
            for end in range(start + 1, min(start + maxWordLen + 1, len(s) + 1)):
                if s[start:end] in wordSet and canBreak(end):
                    return True
            return False

        return canBreak(0)