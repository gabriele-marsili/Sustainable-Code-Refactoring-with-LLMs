# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/surrounded-regions/
#
# DESC:
# =====
# Given a 2D board containing 'X' and 'O' (the letter O), capture all regions surrounded by 'X'.
#
# A region is captured by flipping all 'O's into 'X's in that surrounded region.
#
# Example:
# X X X X
# X O O X
# X X O X
# X O X X
#
# After running your function, the board should be:
# X X X X
# X X X X
# X X X X
# X O X X
#
# Explanation:
# Surrounded regions shouldn’t be on the border,
# which means that any 'O' on the border of the board are not flipped to 'X'.
# Any 'O' that is not on the border and it is not connected to an 'O' on the border will be flipped to 'X'.
# Two cells are connected if they are adjacent cells connected horizontally or vertically.
#
################################################
from typing import List


class Solution:
  def solve(self, board: List[List[str]]) -> None:
    if not board:
      return

    m, n = len(board), len(board[0])

    def dfs(i, j):
      if 0 <= i < m and 0 <= j < n and board[i][j] == 'O':
        board[i][j] = 'S'
        dfs(i + 1, j)
        dfs(i - 1, j)
        dfs(i, j + 1)
        dfs(i, j - 1)

    for i in range(m):
      if board[i][0] == 'O':
        dfs(i, 0)
      if board[i][n - 1] == 'O':
        dfs(i, n - 1)

    for j in range(n):
      if board[0][j] == 'O':
        dfs(0, j)
      if board[m - 1][j] == 'O':
        dfs(m - 1, j)

    for i in range(m):
      for j in range(n):
        if board[i][j] == 'O':
          board[i][j] = 'X'
        elif board[i][j] == 'S':
          board[i][j] = 'O'