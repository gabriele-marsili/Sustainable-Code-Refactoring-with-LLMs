from collections import deque


class Solution:
    def snakesAndLadders(self, board):
        n = len(board)
        size = n * n
        q = deque([1])
        visited = {1}
        distance = [-1] * (size + 1)
        distance[1] = 0

        def get_coordinates(square):
            row = (square - 1) // n
            col = (square - 1) % n
            row = n - 1 - row
            if (n - 1 - row) % 2 != 0:
                col = n - 1 - col
            return row, col

        while q:
            square = q.popleft()
            if square == size:
                return distance[square]

            for i in range(1, 7):
                next_square = square + i
                if next_square > size:
                    continue

                row, col = get_coordinates(next_square)
                destination = board[row][col]
                if destination != -1:
                    next_square = destination

                if next_square not in visited:
                    visited.add(next_square)
                    distance[next_square] = distance[square] + 1
                    q.append(next_square)

        return -1