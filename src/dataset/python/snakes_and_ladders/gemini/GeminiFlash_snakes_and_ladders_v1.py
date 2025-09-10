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

                # Calculate row and column from square number
                row = (next_square - 1) // n
                col = (next_square - 1) % n

                # Adjust row to be from bottom to top
                row = n - 1 - row

                # Adjust column based on row (even rows are left to right, odd are right to left)
                if (n - 1 - row) % 2 != 0:
                    col = n - 1 - col

                destination = board[row][col]
                if destination != -1:
                    next_square = destination

                if next_square not in visited:
                    visited.add(next_square)
                    q.append((next_square, moves + 1))

        return -1