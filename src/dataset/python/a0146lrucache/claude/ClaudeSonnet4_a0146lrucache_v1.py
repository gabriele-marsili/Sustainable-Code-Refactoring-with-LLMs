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
    __slots__ = ['key', 'value', 'prev', 'next']
    
    def __init__(self, key=None, value=None, prev=None, next=None):
        self.key = key
        self.value = value
        self.prev = prev
        self.next = next


class LRUCache:
    __slots__ = ['capacity', 'entries', 'head', 'tail']

    def __init__(self, capacity: int):
        self.capacity = capacity
        self.entries = {}
        self.head = Node()
        self.tail = Node()
        self.head.next = self.tail
        self.tail.prev = self.head

    def get(self, key: int) -> int:
        entry = self.entries.get(key)
        if entry:
            self.__move_to_head(entry)
            return entry.value
        return -1

    def put(self, key: int, value: int) -> None:
        entry = self.entries.get(key)
        if entry:
            entry.value = value
            self.__move_to_head(entry)
        else:
            if len(self.entries) >= self.capacity:
                last = self.tail.prev
                self.__remove(last)
                del self.entries[last.key]
            
            entry = Node(key, value)
            self.entries[key] = entry
            self.__add_to_head(entry)

    def __move_to_head(self, entry):
        self.__remove(entry)
        self.__add_to_head(entry)

    def __add_to_head(self, entry):
        entry.prev = self.head
        entry.next = self.head.next
        self.head.next.prev = entry
        self.head.next = entry

    def __remove(self, entry):
        entry.prev.next = entry.next
        entry.next.prev = entry.prev