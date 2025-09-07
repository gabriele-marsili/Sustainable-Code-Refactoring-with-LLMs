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

__slots__ = ['word', 'children']

class Node:
    __slots__ = ['word', 'children']
    
    def __init__(self):
        self.word = False
        self.children = {}


class Trie:
    __slots__ = ['root']
    
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
        children = node.children
        
        for char in word:
            if char in children:
                node = children[char]
            else:
                new_node = Node()
                children[char] = new_node
                node = new_node
            children = node.children
        
        node.word = True

    def search(self, word: str) -> bool:
        """
        Returns if the word is in the trie.
        """
        node = self.root
        children = node.children
        
        for char in word:
            if char in children:
                node = children[char]
                children = node.children
            else:
                return False
        
        return node.word

    def startsWith(self, prefix: str) -> bool:
        """
        Returns if there is any word in the trie that starts with the given prefix.
        """
        node = self.root
        children = node.children
        
        for char in prefix:
            if char in children:
                node = children[char]
                children = node.children
            else:
                return False
        
        return True