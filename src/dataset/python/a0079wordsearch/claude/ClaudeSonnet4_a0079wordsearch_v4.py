# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/word-search/
#
# DESC:
# =====
# Given a 2D board and a word, find if the word exists in the grid.
#
# The word can be constructed from letters of sequentially adjacent cell,
# where "adjacent" cells are those horizontally or vertically neighboring.
# The same letter cell may not be used more than once.
#
# Example:
# board =
# [
#   ['A','B','C','E'],
#   ['S','F','C','S'],
#   ['A','D','E','E']
# ]
#
# Given word = "ABCCED", return true.
# Given word = "SEE", return true.
# Given word = "ABCB", return false.
#
################################################
from typing import List


class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        if not board or not word:
            return False
        
        rows, cols = len(board), len(board[0])
        word_len = len(word)
        
        if word_len > rows * cols:
            return False
        
        char_count = {}
        for row in board:
            for char in row:
                char_count[char] = char_count.get(char, 0) + 1
        
        word_char_count = {}
        for char in word:
            word_char_count[char] = word_char_count.get(char, 0) + 1
        
        for char, count in word_char_count.items():
            if char_count.get(char, 0) < count:
                return False
        
        if word_char_count[word[0]] > word_char_count[word[-1]]:
            word = word[::-1]
        
        directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]
        
        def helper(i, j, word_idx):
            if word_idx == word_len:
                return True
            
            if (i < 0 or i >= rows or j < 0 or j >= cols or 
                board[i][j] != word[word_idx]):
                return False
            
            temp = board[i][j]
            board[i][j] = '#'
            
            for di, dj in directions:
                if helper(i + di, j + dj, word_idx + 1):
                    board[i][j] = temp
                    return True
            
            board[i][j] = temp
            return False
        
        for i in range(rows):
            for j in range(cols):
                if board[i][j] == word[0] and helper(i, j, 0):
                    return True
        
        return False