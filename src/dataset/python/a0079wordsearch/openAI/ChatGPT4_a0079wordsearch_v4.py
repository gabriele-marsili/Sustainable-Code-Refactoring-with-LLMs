# -*- coding: utf-8 -*-
from typing import List

class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        if not board or not word:
            return False

        rows, cols = len(board), len(board[0])
        word_len = len(word)

        def dfs(i, j, index):
            if index == word_len:
                return True
            if i < 0 or i >= rows or j < 0 or j >= cols or board[i][j] != word[index]:
                return False

            board[i][j], temp = "#", board[i][j]
            found = (
                dfs(i + 1, j, index + 1) or
                dfs(i - 1, j, index + 1) or
                dfs(i, j + 1, index + 1) or
                dfs(i, j - 1, index + 1)
            )
            board[i][j] = temp
            return found

        for i in range(rows):
            for j in range(cols):
                if board[i][j] == word[0] and dfs(i, j, 0):
                    return True

        return False