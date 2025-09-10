class Solution(object):
    def isValidSudoku(self, board):
        """
        :type board: List[List[str]]
        :rtype: bool
        """
        seen = set()
        for i in range(9):
            for j in range(9):
                val = board[i][j]
                if val != '.':
                    row_key = (val, i)
                    col_key = (j, val)
                    box_key = (i // 3, j // 3, val)

                    if row_key in seen or col_key in seen or box_key in seen:
                        return False

                    seen.add(row_key)
                    seen.add(col_key)
                    seen.add(box_key)

        return True