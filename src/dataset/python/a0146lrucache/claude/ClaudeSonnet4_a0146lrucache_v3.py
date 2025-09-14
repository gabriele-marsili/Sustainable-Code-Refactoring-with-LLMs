# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/lru-cache/
#
# DESC:
# =====
# Design and implement a data structure for Least Recently Used (LRU) cache.
# It should support the following operations: get and put.
#
# get(key) - Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1.
# put(key, value) - Set or insert the value if the key is not already present.
# When the cache reached its capacity, it should invalidate the least recently used item before inserting a new item.
#
# The cache is initialized with a positive capacity.
#
# Follow up:
# Could you do both operations in O(1) time complexity?
#
# Example:
#
# LRUCache cache = new LRUCache( 2 /* capacity */ );
# cache.put(1, 1);
# cache.put(2, 2);
# cache.get(1);       // returns 1
# cache.put(3, 3);    // evicts key 2
# cache.get(2);       // returns -1 (not found)
# cache.put(4, 4);    // evicts key 1
# cache.get(1);       // returns -1 (not found)
# cache.get(3);       // returns 3
# cache.get(4);       // returns 4
################################################

class Node:
    __slots__ = ('key', 'value', 'prev', 'next')
    
    def __init__(self, key=None, value=None, prev=None, next=None):
        self.key = key
        self.value = value
        self.prev = prev
        self.next = next


class LRUCache:
    __slots__ = ('capacity', 'entries', 'head', 'tail')

    def __init__(self, capacity: int):
        self.capacity = capacity
        self.entries = {}
        self.head = Node()
        self.tail = Node()
        self.head.next = self.tail
        self.tail.prev = self.head

    def get(self, key: int) -> int:
        node = self.entries.get(key)
        if node is None:
            return -1
        
        self._move_to_head(node)
        return node.value

    def put(self, key: int, value: int) -> None:
        node = self.entries.get(key)
        
        if node is None:
            if len(self.entries) >= self.capacity:
                tail_node = self.tail.prev
                self._remove_node(tail_node)
                del self.entries[tail_node.key]
            
            new_node = Node(key, value)
            self.entries[key] = new_node
            self._add_to_head(new_node)
        else:
            node.value = value
            self._move_to_head(node)

    def _remove_node(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def _add_to_head(self, node):
        node.prev = self.head
        node.next = self.head.next
        self.head.next.prev = node
        self.head.next = node

    def _move_to_head(self, node):
        self._remove_node(node)
        self._add_to_head(node)