# -*- coding: utf-8 -*-

class Node:
    __slots__ = ('word', 'children')

    def __init__(self):
        self.word = False
        self.children = {}


class Trie:
    __slots__ = ('root',)

    def __init__(self):
        self.root = Node()

    def insert(self, word: str) -> None:
        node = self.root
        for char in word:
            node = node.children.setdefault(char, Node())
        node.word = True

    def search(self, word: str) -> bool:
        node = self._find_node(word)
        return node.word if node else False

    def startsWith(self, prefix: str) -> bool:
        return self._find_node(prefix) is not None

    def _find_node(self, prefix: str) -> Node:
        node = self.root
        for char in prefix:
            if char not in node.children:
                return None
            node = node.children[char]
        return node