# -*- coding: utf-8 -*-

################################################
#
# URL:
# =====
# https://leetcode.com/problems/copy-list-with-random-pointer/
#
# DESC:
# =====
# A linked list is given such that each node contains an additional random pointer
# which could point to any node in the list or null.
#
# Return a deep copy of the list.
#
#
#
# Example 1:
#
#
#
# Input:
# {
#   "$id":"1",
#   "next":{"$id":"2","next":null,"random":{"$ref":"2"},"val":2},
#   "random":{"$ref":"2"},
#   "val":1
# }
#
# Explanation:
# Node 1's value is 1, both of its next and random pointer points to Node 2.
# Node 2's value is 2, its next pointer points to null and its random pointer points to itself.
#
#
# Note:
#
# You must return the copy of the given head as a reference to the cloned list.
################################################


class Solution:
    def copyRandomList(self, head: 'Node') -> 'Node':
        if not head:
            return None
        
        current = head
        while current:
            cloned = Node(current.val, current.next, None)
            current.next = cloned
            current = cloned.next
        
        current = head
        while current:
            if current.random:
                current.next.random = current.random.next
            current = current.next.next
        
        dummy = Node(0, None, None)
        current = head
        cloned_current = dummy
        
        while current:
            cloned_current.next = current.next
            current.next = current.next.next
            current = current.next
            cloned_current = cloned_current.next
        
        return dummy.next


class Node:
    __slots__ = ['val', 'next', 'random']
    
    def __init__(self, val, next, random):
        self.val = val
        self.next = next
        self.random = random