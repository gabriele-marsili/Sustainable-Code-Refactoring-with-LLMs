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

    def helper(row, col, word_index):
      if word_index == len(word):
        return True

      if row < 0 or row >= rows or col < 0 or col >= cols or board[row][col] != word[word_index]:
        return False

      char = board[row][col]
      board[row][col] = "#"  # Mark as visited

      found = (helper(row + 1, col, word_index + 1) or
               helper(row - 1, col, word_index + 1) or
               helper(row, col + 1, word_index + 1) or
               helper(row, col - 1, word_index + 1))

      board[row][col] = char  # Backtrack: Restore the original character
      return found

    for i in range(rows):
      for j in range(cols):
        if helper(i, j, 0):
          return True

    return False