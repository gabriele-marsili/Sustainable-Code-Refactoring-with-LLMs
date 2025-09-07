# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/add-and-search-word-data-structure-design/
#
# DESC:
# =====
# Design a data structure that supports the following two operations:
# void addWord(word)
# bool search(word)
#
# search(word) can search a literal word or a regular expression string containing only letters a-z or ..
# A . means it can represent any one letter.
#
# Example:
# addWord("bad")
# addWord("dad")
# addWord("mad")
# search("pad") -> false
# search("bad") -> true
# search(".ad") -> true
# search("b..") -> true
#
# Note:
# You may assume that all words are consist of lowercase letters a-z..
################################################


class Node:
  def __init__(self):
    self.is_word = False
    self.children = {}


class WordDictionary:
  def __init__(self):
    """
    Initialize your data structure here.
    """
    self.root = Node()

  def addWord(self, word: str) -> None:
    """
    Adds a word into the data structure.
    """
    node = self.root
    for char in word:
      if char not in node.children:
        node.children[char] = Node()
      node = node.children[char]
    node.is_word = True

  def search(self, word: str) -> bool:
    """
    Returns if the word is in the data structure.
    A word could contain the dot character '.' to represent any one letter.
    """
    return self._search_recursive(self.root, word, 0)

  def _search_recursive(self, node, word, index):
    if index == len(word):
      return node.is_word

    char = word[index]

    if char == '.':
      for child in node.children.values():
        if self._search_recursive(child, word, index + 1):
          return True
      return False
    elif char in node.children:
      return self._search_recursive(node.children[char], word, index + 1)
    else:
      return False