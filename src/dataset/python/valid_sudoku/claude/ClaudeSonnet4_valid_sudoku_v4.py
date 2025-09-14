class Solution(object):
    def isValidRow(self, board):
        for row in board:
            if not self.isValid(row):
                return False
        return True

    def isValidCol(self, board):
        for col in zip(*board):
            if not self.isValid(col):
                return False
        return True

    def isValidSquare(self, board):
        for i in (0, 3, 6):
            for j in (0, 3, 6):
                square = [board[x][y] for x in range(i, i + 3) for y in range(j, j + 3)]
                if not self.isValid(square):
                    return False
        return True

    def isValid(self, cells):
        seen = set()
        for cell in cells:
            if cell != ".":
                if cell in seen:
                    return False
                seen.add(cell)
        return True

    def isValidSudoku(self, board):
        """
        :type board: List[List[str]]
        :rtype: bool
        """
        seen = set()
        
        for i in range(9):
            for j in range(9):
                cell = board[i][j]
                if cell != ".":
                    row_key = (i, cell)
                    col_key = (cell, j)
                    box_key = (i // 3, j // 3, cell)
                    
                    if row_key in seen or col_key in seen or box_key in seen:
                        return False
                    
                    seen.add(row_key)
                    seen.add(col_key)
                    seen.add(box_key)
        
        return True