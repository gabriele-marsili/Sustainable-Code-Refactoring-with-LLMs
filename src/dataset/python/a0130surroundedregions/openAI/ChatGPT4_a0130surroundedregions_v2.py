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

        # Add all border 'O's to the queue
        for i in range(m):
            mark_border_connected(i, 0)
            mark_border_connected(i, n - 1)
        for j in range(n):
            mark_border_connected(0, j)
            mark_border_connected(m - 1, j)

        # Process the queue
        while queue:
            i, j = queue.popleft()
            for x, y in [(i - 1, j), (i + 1, j), (i, j - 1), (i, j + 1)]:
                mark_border_connected(x, y)

        # Update the board in place
        for i in range(m):
            for j in range(n):
                if board[i][j] == 'S':
                    board[i][j] = 'O'
                elif board[i][j] == 'O':
                    board[i][j] = 'X'