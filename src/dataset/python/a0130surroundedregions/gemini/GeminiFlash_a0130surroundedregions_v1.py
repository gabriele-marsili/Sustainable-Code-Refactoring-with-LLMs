from typing import List


class Solution:
  def solve(self, board: List[List[str]]) -> None:
    if not board:
      return

    m = len(board)
    n = len(board[0])

    def dfs(i, j):
      if 0 <= i < m and 0 <= j < n and board[i][j] == 'O':
        board[i][j] = 'S'
        dfs(i, j - 1)
        dfs(i, j + 1)
        dfs(i - 1, j)
        dfs(i + 1, j)

    # Mark 'O's connected to the border as 'S'
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

    # Flip 'O's to 'X' and 'S's to 'O'
    for i in range(m):
      for j in range(n):
        if board[i][j] == 'O':
          board[i][j] = 'X'
        elif board[i][j] == 'S':
          board[i][j] = 'O'