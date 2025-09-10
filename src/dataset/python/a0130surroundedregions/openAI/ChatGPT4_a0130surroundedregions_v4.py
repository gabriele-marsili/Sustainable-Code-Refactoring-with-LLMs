from typing import List
from collections import deque

class Solution:
    def solve(self, board: List[List[str]]) -> None:
        if not board or not board[0]:
            return

        m, n = len(board), len(board[0])
        queue = deque()

        def mark_border_connected(i, j):
            if 0 <= i < m and 0 <= j < n and board[i][j] == 'O':
                board[i][j] = 'S'
                queue.append((i, j))

        for i in range(m):
            mark_border_connected(i, 0)
            mark_border_connected(i, n - 1)
        for j in range(n):
            mark_border_connected(0, j)
            mark_border_connected(m - 1, j)

        while queue:
            i, j = queue.popleft()
            for x, y in ((i - 1, j), (i + 1, j), (i, j - 1), (i, j + 1)):
                mark_border_connected(x, y)

        for i in range(m):
            for j in range(n):
                board[i][j] = 'X' if board[i][j] != 'S' else 'O'