class Solution(object):
    def isValidRow(self, board):
        for row in board:
            seen = set()
            for cell in row:
                if cell != "." and cell in seen:
                    return False
                if cell != ".":
                    seen.add(cell)
        return True

    def isValidCol(self, board):
        for j in range(9):
            seen = set()
            for i in range(9):
                cell = board[i][j]
                if cell != "." and cell in seen:
                    return False
                if cell != ".":
                    seen.add(cell)
        return True

    def isValidSquare(self, board):
        for i in (0, 3, 6):
            for j in (0, 3, 6):
                seen = set()
                for x in range(i, i + 3):
                    for y in range(j, j + 3):
                        cell = board[x][y]
                        if cell != "." and cell in seen:
                            return False
                        if cell != ".":
                            seen.add(cell)
        return True

    def isValid(self, cells):
        seen = set()
        for cell in cells:
            if cell != "." and cell in seen:
                return False
            if cell != ".":
                seen.add(cell)
        return True

    def isValidSudoku(self, board):
        """
        :type board: List[List[str]]
        :rtype: bool
        """
        return (
            self.isValidRow(board)
            and self.isValidCol(board)
            and self.isValidSquare(board)
        )