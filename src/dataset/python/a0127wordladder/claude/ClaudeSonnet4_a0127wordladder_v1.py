# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/word-ladder/
#
# DESC:
# =====
# Given two words (beginWord and endWord), and a dictionary's word list,
# find the length of shortest transformation sequence from beginWord to endWord, such that:
#
# Only one letter can be changed at a time.
# Each transformed word must exist in the word list. Note that beginWord is not a transformed word.
# Note:
#
# Return 0 if there is no such transformation sequence.
# All words have the same length.
# All words contain only lowercase alphabetic characters.
# You may assume no duplicates in the word list.
# You may assume beginWord and endWord are non-empty and are not the same.
#
# Example 1:
# Input:
# beginWord = "hit",
# endWord = "cog",
# wordList = ["hot","dot","dog","lot","log","cog"]
# Output: 5
# Explanation: As one shortest transformation is "hit" -> "hot" -> "dot" -> "dog" -> "cog",
# return its length 5.
#
# Example 2:
# Input:
# beginWord = "hit"
# endWord = "cog"
# wordList = ["hot","dot","dog","lot","log"]
# Output: 0
# Explanation: The endWord "cog" is not in wordList, therefore no possible transformation.
#
################################################
import collections
from typing import List


class Solution:
  def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
    wordSet = set(wordList)
    if endWord not in wordSet:
      return 0
    
    queue = collections.deque([(beginWord, 1)])
    visited = {beginWord}
    
    while queue:
      word, length = queue.popleft()
      if word == endWord:
        return length

      word_list = list(word)
      for i in range(len(word_list)):
        original_char = word_list[i]
        for ch in 'abcdefghijklmnopqrstuvwxyz':
          if ch != original_char:
            word_list[i] = ch
            newWord = ''.join(word_list)
            if newWord in wordSet and newWord not in visited:
              if newWord == endWord:
                return length + 1
              queue.append((newWord, length + 1))
              visited.add(newWord)
        word_list[i] = original_char
    return 0