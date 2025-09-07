# -*- coding: utf-8 -*-
from utils.list.ListNode import ListNode

class Solution:
    def rotateRight(self, head: ListNode, k: int) -> ListNode:
        if not head or not head.next or k == 0:
            return head

        # Calculate the size of the list and find the tail
        size, tail = 1, head
        while tail.next:
            tail = tail.next
            size += 1

        # Effective rotations
        k %= size
        if k == 0:
            return head

        # Find the new head
        steps_to_new_head = size - k
        new_tail = head
        for _ in range(steps_to_new_head - 1):
            new_tail = new_tail.next

        new_head = new_tail.next
        new_tail.next = None
        tail.next = head

        return new_head