class Solution(object):
    def isValidRow(self, board):
        return all(self.isValid(row) for row in board)

    def isValidCol(self, board):
        return all(self.isValid(col) for col in zip(*board))

    def isValidSquare(self, board):
        return all(
            self.isValid(
                [board[x][y] for x in range(i, i + 3) for y in range(j, j + 3)]
            )
            for i in (0, 3, 6)
            for j in (0, 3, 6)
        )

    def isValid(self, cells):
        seen = set()
        return all(c not in seen and not seen.add(c) for c in cells if c != ".")

    def isValidSudoku(self, board):
        return (
            self.isValidRow(board)
            and self.isValidCol(board)
            and self.isValidSquare(board)
        )