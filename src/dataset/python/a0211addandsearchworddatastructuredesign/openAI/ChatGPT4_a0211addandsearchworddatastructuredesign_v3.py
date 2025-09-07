class Node:
    __slots__ = ('isWord', 'children')

    def __init__(self):
        self.isWord = False
        self.children = {}


class WordDictionary:
    def __init__(self):
        self.root = Node()

    def addWord(self, word: str) -> None:
        node = self.root
        for c in word:
            node = node.children.setdefault(c, Node())
        node.isWord = True

    def search(self, word: str) -> bool:
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