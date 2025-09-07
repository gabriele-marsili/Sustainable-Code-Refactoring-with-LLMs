# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/implement-trie-prefix-tree/
#
# DESC:
# =====
# Implement a trie with insert, search, and startsWith methods.
#
# Example:
# Trie trie = new Trie();
# trie.insert("apple");
# trie.search("apple");   // returns true
# trie.search("app");     // returns false
# trie.startsWith("app"); // returns true
# trie.insert("app");
# trie.search("app");     // returns true
#
# Note:
# You may assume that all inputs are consist of lowercase letters a-z.
# All inputs are guaranteed to be non-empty strings.
################################################


class Node:
  def __init__(self):
    self.word = False
    self.children = [None] * 26


class Trie:
  def __init__(self):
    """
    Initialize your data structure here.
    """
    self.root = Node()

  def insert(self, word: str) -> None:
    """
    Inserts a word into the trie.
    """
    node = self.root
    for char in word:
      index = ord(char) - ord('a')
      if not node.children[index]:
        node.children[index] = Node()
      node = node.children[index]
    node.word = True

  def search(self, word: str) -> bool:
    """
    Returns if the word is in the trie.
    """
    node = self.root
    for char in word:
      index = ord(char) - ord('a')
      if not node.children[index]:
        return False
      node = node.children[index]
    return node.word

  def startsWith(self, prefix: str) -> bool:
    """
    Returns if there is any word in the trie that starts with the given prefix.
    """
    node = self.root
    for char in prefix:
      index = ord(char) - ord('a')
      if not node.children[index]:
        return False
      node = node.children[index]
    return True