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
    
    # Early optimization: count character frequencies
    from collections import Counter
    board_count = Counter()
    for row in board:
      for cell in row:
        board_count[cell] += 1
    
    word_count = Counter(word)
    for char, count in word_count.items():
      if board_count[char] < count:
        return False

    # Start from less frequent character end if beneficial
    if word_count[word[0]] > word_count[word[-1]]:
      word = word[::-1]

    for i in range(rows):
      for j in range(cols):
        if board[i][j] == word[0] and self.helper(board, i, j, word, 0, rows, cols):
          return True

    return False

  def helper(self, board, i, j, word, idx, rows, cols):
    if idx == len(word):
      return True
    if i < 0 or i >= rows or j < 0 or j >= cols or board[i][j] != word[idx]:
      return False

    tmp = board[i][j]
    board[i][j] = "#"
    
    # Use tuple for directions to avoid repeated calculations
    directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]
    for di, dj in directions:
      if self.helper(board, i + di, j + dj, word, idx + 1, rows, cols):
        board[i][j] = tmp
        return True
    
    board[i][j] = tmp
    return False