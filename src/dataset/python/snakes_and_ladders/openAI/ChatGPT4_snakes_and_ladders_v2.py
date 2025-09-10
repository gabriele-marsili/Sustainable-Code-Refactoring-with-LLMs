from collections import deque

class Solution:
    def snakesAndLadders(self, board):
        n = len(board)
        def get_position(num):
            r, c = divmod(num - 1, n)
            row = n - 1 - r
            col = c if r % 2 == 0 else n - 1 - c
            return row, col

        visited = set()
        q = deque([(1, 0)])  # (current square, moves)
        visited.add(1)

        while q:
            square, moves = q.popleft()
            if square == n * n:
                return moves

            for i in range(1, 7):
                next_square = square + i
                if next_square > n * n:
                    break

                r, c = get_position(next_square)
                if board[r][c] != -1:
                    next_square = board[r][c]

                if next_square not in visited:
                    visited.add(next_square)
                    q.append((next_square, moves + 1))

        return -1