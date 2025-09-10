from collections import deque

class Solution:
    def snakesAndLadders(self, board):
        n = len(board)
        visited = set()
        q = deque([(1, 0)])  # (current square, moves)

        def get_coordinates(square):
            row, col = divmod(square - 1, n)
            r = n - 1 - row
            c = col if row % 2 == 0 else n - 1 - col
            return r, c

        while q:
            square, moves = q.popleft()
            if square == n * n:
                return moves
            for i in range(1, 7):
                next_square = square + i
                if next_square > n * n:
                    break
                r, c = get_coordinates(next_square)
                if board[r][c] != -1:
                    next_square = board[r][c]
                if next_square not in visited:
                    visited.add(next_square)
                    q.append((next_square, moves + 1))

        return -1