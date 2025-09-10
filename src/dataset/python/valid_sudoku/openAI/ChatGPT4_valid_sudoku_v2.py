class Solution(object):
    def isValidSudoku(self, board):
        """
        :type board: List[List[str]]
        :rtype: bool
        """
        def isValidGroup(cells):
            seen = set()
            for cell in cells:
                if cell != ".":
                    if cell in seen:
                        return False
                    seen.add(cell)
            return True

        for i in range(9):
            if not isValidGroup(board[i]):  # Check row
                return False
            if not isValidGroup([board[x][i] for x in range(9)]):  # Check column
                return False

        for i in (0, 3, 6):
            for j in (0, 3, 6):
                if not isValidGroup(
                    board[x][y] for x in range(i, i + 3) for y in range(j, j + 3)
                ):  # Check 3x3 square
                    return False

        return True