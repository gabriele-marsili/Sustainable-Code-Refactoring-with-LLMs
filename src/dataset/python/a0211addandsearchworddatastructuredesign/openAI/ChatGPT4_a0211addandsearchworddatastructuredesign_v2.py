class Node:
    __slots__ = ('isWord', 'children')  # Reduce memory usage by limiting attributes
    def __init__(self):
        self.isWord = False
        self.children = {}

class WordDictionary:
    def __init__(self):
        self.root = Node()

    def addWord(self, word: str) -> None:
        node = self.root
        for c in word:
            node = node.children.setdefault(c, Node())  # Use setdefault to simplify logic
        node.isWord = True

    def search(self, word: str) -> bool:
        return self._find(self.root, word, 0)

    def _find(self, node, word, index: int) -> bool:
        if index == len(word):
            return node.isWord
        char = word[index]
        if char == '.':
            return any(self._find(child, word, index + 1) for child in node.children.values())
        if char in node.children:
            return self._find(node.children[char], word, index + 1)
        return False