# -*- coding: utf-8 -*-
import collections
from typing import List


class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
        wordSet = set(wordList)
        if endWord not in wordSet:
            return 0

        queue = collections.deque([(beginWord, 1)])
        visited = {beginWord}
        wordLen = len(beginWord)

        while queue:
            word, length = queue.popleft()
            for i in range(wordLen):
                prefix, suffix = word[:i], word[i + 1:]
                for ch in "abcdefghijklmnopqrstuvwxyz":
                    newWord = f"{prefix}{ch}{suffix}"
                    if newWord == endWord:
                        return length + 1
                    if newWord in wordSet and newWord not in visited:
                        queue.append((newWord, length + 1))
                        visited.add(newWord)
        return 0