class Solution(object):
    def isValid(self, cells):
        seen = set()
        for i in cells:
            if i != ".":
                if i in seen:
                    return False
                seen.add(i)
        return True

    def isValidSudoku(self, board):
        """
        :type board: List[List[str]]
        :rtype: bool
        """
        for i in range(9):
            if not self.isValid(board[i]) or not self.isValid([board[x][i] for x in range(9)]):
                return False

        for i in (0, 3, 6):
            for j in (0, 3, 6):
                if not self.isValid([board[x][y] for x in range(i, i + 3) for y in range(j, j + 3)]):
                    return False

        return True