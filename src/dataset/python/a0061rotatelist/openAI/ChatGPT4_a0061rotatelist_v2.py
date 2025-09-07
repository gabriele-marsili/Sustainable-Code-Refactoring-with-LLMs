# -*- coding: utf-8 -*-

from utils.list.ListNode import ListNode

class Solution:
    def rotateRight(self, head: ListNode, k: int) -> ListNode:
        if not head or k == 0:
            return head

        # Calculate the size of the list and find the tail in one pass
        size = 1
        tail = head
        while tail.next:
            tail = tail.next
            size += 1

        # Reduce k to within the bounds of the list size
        k %= size
        if k == 0:
            return head

        # Find the new head in one pass
        steps_to_new_head = size - k
        new_tail = head
        for _ in range(steps_to_new_head - 1):
            new_tail = new_tail.next

        # Reorganize pointers to rotate the list
        new_head = new_tail.next
        new_tail.next = None
        tail.next = head

        return new_head