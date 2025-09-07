# -*- coding: utf-8 -*-
from typing import List


class Solution:
    def partition(self, s: str) -> List[List[str]]:
        result = []
        self._dfs(s, [], result)
        return result

    def _dfs(self, s: str, path: List[str], result: List[List[str]]):
        if not s:
            result.append(path)
            return
        for length in range(1, len(s) + 1):
            part1 = s[:length]
            if self.isPalindrome(part1):
                self._dfs(s[length:], path + [part1], result)

    def isPalindrome(self, s: str) -> bool:
        return s == s[::-1]