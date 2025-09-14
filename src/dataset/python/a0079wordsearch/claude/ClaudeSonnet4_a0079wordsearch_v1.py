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
    if not board or not word:
      return False

    rows, cols = len(board), len(board[0])
    word_len = len(word)
    
    # Early termination: check if board has enough cells
    if word_len > rows * cols:
      return False
    
    # Count character frequencies for early pruning
    board_chars = {}
    for row in board:
      for char in row:
        board_chars[char] = board_chars.get(char, 0) + 1
    
    word_chars = {}
    for char in word:
      word_chars[char] = word_chars.get(char, 0) + 1
    
    # Check if board has enough of each character
    for char, count in word_chars.items():
      if board_chars.get(char, 0) < count:
        return False

    # Optimize starting positions by checking first character
    first_char = word[0]
    for i in range(rows):
      for j in range(cols):
        if board[i][j] == first_char and self.helper(board, i, j, word, 0, rows, cols, word_len):
          return True

    return False

  def helper(self, board, i, j, word, idx, rows, cols, word_len):
    if idx == word_len:
      return True
    if i < 0 or i >= rows or j < 0 or j >= cols or board[i][j] != word[idx]:
      return False

    tmp = board[i][j]
    board[i][j] = "#"
    
    # Use short-circuit evaluation efficiently
    result = (self.helper(board, i + 1, j, word, idx + 1, rows, cols, word_len) or
              self.helper(board, i - 1, j, word, idx + 1, rows, cols, word_len) or
              self.helper(board, i, j + 1, word, idx + 1, rows, cols, word_len) or
              self.helper(board, i, j - 1, word, idx + 1, rows, cols, word_len))
    
    board[i][j] = tmp
    return result