# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/surrounded-regions/
#
# DESC:
# =====
# Given a 2D board containing 'X' and 'O' (the letter O), capture all regions surrounded by 'X'.
#
# A region is captured by flipping all 'O's into 'X's in that surrounded region.
#
# Example:
# X X X X
# X O O X
# X X O X
# X O X X
#
# After running your function, the board should be:
# X X X X
# X X X X
# X X X X
# X O X X
#
# Explanation:
# Surrounded regions shouldn't be on the border,
# which means that any 'O' on the border of the board are not flipped to 'X'.
# Any 'O' that is not on the border and it is not connected to an 'O' on the border will be flipped to 'X'.
# Two cells are connected if they are adjacent cells connected horizontally or vertically.
#
################################################
from typing import List
from collections import deque


class Solution:
    def solve(self, board: List[List[str]]) -> None:
        if not board or not board[0]:
            return
        
        m, n = len(board), len(board[0])
        
        def mark_safe(start_i: int, start_j: int) -> None:
            if board[start_i][start_j] != 'O':
                return
            
            queue = deque([(start_i, start_j)])
            board[start_i][start_j] = 'S'
            
            while queue:
                i, j = queue.popleft()
                for di, dj in ((0, 1), (0, -1), (1, 0), (-1, 0)):
                    ni, nj = i + di, j + dj
                    if 0 <= ni < m and 0 <= nj < n and board[ni][nj] == 'O':
                        board[ni][nj] = 'S'
                        queue.append((ni, nj))
        
        for i in range(m):
            mark_safe(i, 0)
            mark_safe(i, n - 1)
        
        for j in range(n):
            mark_safe(0, j)
            mark_safe(m - 1, j)
        
        for i in range(m):
            for j in range(n):
                if board[i][j] == 'O':
                    board[i][j] = 'X'
                elif board[i][j] == 'S':
                    board[i][j] = 'O'