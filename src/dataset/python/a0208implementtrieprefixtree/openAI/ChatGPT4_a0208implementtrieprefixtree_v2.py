# -*- coding: utf-8 -*-

class Node:
    __slots__ = ('word', 'children')  # Reduce memory overhead
    def __init__(self):
        self.word = False
        self.children = {}

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
            node = node.children.setdefault(char, Node())
        node.word = True

    def search(self, word: str) -> bool:
        """
        Returns if the word is in the trie.
        """
        node = self._find_node(word)
        return node.word if node else False

    def startsWith(self, prefix: str) -> bool:
        """
        Returns if there is any word in the trie that starts with the given prefix.
        """
        return self._find_node(prefix) is not None

    def _find_node(self, prefix: str) -> Node:
        """
        Helper function to traverse the trie and return the node corresponding to the prefix.
        """
        node = self.root
        for char in prefix:
            if char not in node.children:
                return None
            node = node.children[char]
        return node