from collections import deque


class Solution:
    def snakesAndLadders(self, board):
        n = len(board)
        size = n * n
        q = deque([(1, 0)])  # (square, moves)
        visited = {1}

        while q:
            square, moves = q.popleft()

            if square == size:
                return moves

            for i in range(1, 7):
                next_square = square + i
                if next_square > size:
                    continue

                # Calculate row and column efficiently
                row = (next_square - 1) // n
                col = (next_square - 1) % n

                # Convert to board coordinates
                board_row = n - 1 - row
                board_col = col if row % 2 == 0 else n - 1 - col

                destination = board[board_row][board_col]
                if destination != -1:
                    next_square = destination

                if next_square not in visited:
                    visited.add(next_square)
                    q.append((next_square, moves + 1))

        return -1