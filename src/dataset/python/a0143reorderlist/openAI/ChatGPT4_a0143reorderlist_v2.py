# -*- coding: utf-8 -*-

from utils.list.ListNode import ListNode

class Solution:
    def reorderList(self, head):
        if not head or not head.next or not head.next.next:
            return
        
        # Find the middle of the list
        slow, fast = head, head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        
        # Reverse the second half of the list
        prev, curr = None, slow.next
        slow.next = None  # Split the list into two halves
        while curr:
            next_temp = curr.next
            curr.next = prev
            prev = curr
            curr = next_temp
        
        # Merge the two halves
        first, second = head, prev
        while second:
            first_next, second_next = first.next, second.next
            first.next = second
            second.next = first_next
            first, second = first_next, second_next