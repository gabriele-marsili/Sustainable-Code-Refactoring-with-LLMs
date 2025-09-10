from collections import deque


class Solution:
    def snakesAndLadders(self, board):
        n = len(board)
        total_squares = n * n

        def get_coordinates(square):
            row, col = divmod(square - 1, n)
            actual_row = n - 1 - row
            actual_col = col if row % 2 == 0 else n - 1 - col
            return actual_row, actual_col

        q = deque([1])
        visited = set([1])
        moves = 0

        while q:
            for _ in range(len(q)):
                square = q.popleft()
                if square == total_squares:
                    return moves
                for roll in range(1, 7):
                    next_square = square + roll
                    if next_square > total_squares:
                        break
                    r, c = get_coordinates(next_square)
                    if board[r][c] != -1:
                        next_square = board[r][c]
                    if next_square not in visited:
                        visited.add(next_square)
                        q.append(next_square)
            moves += 1

        return -1