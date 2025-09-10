# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/word-search/
#
# DESC:
# =====
# Given a 2D board and a word, find if the word exists in the grid.
#
# The word can be constructed from letters of sequentially adjacent cell,
# where "adjacent" cells are those horizontally or vertically neighboring.
# The same letter cell may not be used more than once.
#
# Example:
# board =
# [
#   ['A','B','C','E'],
#   ['S','F','C','S'],
#   ['A','D','E','E']
# ]
#
# Given word = "ABCCED", return true.
# Given word = "SEE", return true.
# Given word = "ABCB", return false.
#
################################################
from typing import List


class Solution:
  def exist(self, board: List[List[str]], word: str) -> bool:
    if not board:
      return False

    rows, cols = len(board), len(board[0])

    def helper(i, j, word_index):
      if word_index == len(word):
        return True
      if i < 0 or i >= rows or j < 0 or j >= cols or board[i][j] != word[word_index]:
        return False

      char = board[i][j]
      board[i][j] = "#"  # Mark as visited

      found = helper(i + 1, j, word_index + 1) or \
              helper(i - 1, j, word_index + 1) or \
              helper(i, j + 1, word_index + 1) or \
              helper(i, j - 1, word_index + 1)

      board[i][j] = char  # Backtrack: Restore the original character
      return found

    for i in range(rows):
      for j in range(cols):
        if helper(i, j, 0):
          return True

    return False