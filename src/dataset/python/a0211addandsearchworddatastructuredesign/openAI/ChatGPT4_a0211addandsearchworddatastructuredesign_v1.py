# -*- coding: utf-8 -*-

class Node:
    __slots__ = ('isWord', 'children')  # Reduce memory usage by limiting attributes
    def __init__(self):
        self.isWord = False
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
        for c in word:
            node = node.children.setdefault(c, Node())  # Use setdefault to simplify logic
        node.isWord = True

    def search(self, word: str) -> bool:
        """
        Returns if the word is in the data structure.
        A word could contain the dot character '.' to represent any one letter.
        """
        def find(node, word, index):
            if index == len(word):
                return node.isWord
            char = word[index]
            if char == '.':
                return any(find(child, word, index + 1) for child in node.children.values())
            if char in node.children:
                return find(node.children[char], word, index + 1)
            return False

        return find(self.root, word, 0)