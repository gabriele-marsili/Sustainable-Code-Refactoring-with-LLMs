# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/reverse-words-in-a-string/
#
# DESC:
# =====
# Given an input string, reverse the string word by word.
#
# Example 1:
# Input: "the sky is blue"
# Output: "blue is sky the"
#
# Example 2:
# Input: "  hello world!  "
# Output: "world! hello"
# Explanation: Your reversed string should not contain leading or trailing spaces.
#
# Example 3:
# Input: "a good   example"
# Output: "example good a"
# Explanation: You need to reduce multiple spaces between two words to a single space in the reversed string.
#
#
# Note:
# A word is defined as a sequence of non-space characters.
# Input string may contain leading or trailing spaces.
# However, your reversed string should not contain leading or trailing spaces.
# You need to reduce multiple spaces between two words to a single space in the reversed string.
#
#
# Follow up:
# For C programmers, try to solve it in-place in O(1) extra space.5
################################################


class Solution:
    def reverseWords(self, s: str) -> str:
        if not s:
            return ""
        
        words = []
        word_start = -1
        
        for i in range(len(s)):
            if s[i] != ' ':
                if word_start == -1:
                    word_start = i
            else:
                if word_start != -1:
                    words.append(s[word_start:i])
                    word_start = -1
        
        if word_start != -1:
            words.append(s[word_start:])
        
        if not words:
            return ""
        
        result_length = sum(len(word) for word in words) + len(words) - 1
        result = [''] * result_length
        pos = 0
        
        for i in range(len(words) - 1, -1, -1):
            word = words[i]
            for char in word:
                result[pos] = char
                pos += 1
            if i > 0:
                result[pos] = ' '
                pos += 1
        
        return ''.join(result)