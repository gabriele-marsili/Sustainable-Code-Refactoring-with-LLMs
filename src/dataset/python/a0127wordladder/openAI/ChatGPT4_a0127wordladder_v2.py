# -*- coding: utf-8 -*-
import collections
from typing import List


class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
        wordSet = set(wordList)
        if endWord not in wordSet:
            return 0

        queue = collections.deque([(beginWord, 1)])
        visited = set([beginWord])

        while queue:
            word, length = queue.popleft()
            for i in range(len(word)):
                for ch in (chr(c) for c in range(97, 123)):  # 'a' to 'z'
                    newWord = word[:i] + ch + word[i + 1:]
                    if newWord == endWord:
                        return length + 1
                    if newWord in wordSet and newWord not in visited:
                        queue.append((newWord, length + 1))
                        visited.add(newWord)
        return 0