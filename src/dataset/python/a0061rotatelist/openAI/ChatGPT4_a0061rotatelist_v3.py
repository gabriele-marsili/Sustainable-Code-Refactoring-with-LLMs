from utils.list.ListNode import ListNode

class Solution:
    def rotateRight(self, head: ListNode, k: int) -> ListNode:
        if not head or not head.next or k == 0:
            return head

        # Calculate the size of the list and connect the tail to the head
        size, tail = 1, head
        while tail.next:
            tail = tail.next
            size += 1

        k %= size
        if k == 0:
            return head

        # Find the new tail (size - k - 1) and new head (size - k)
        new_tail_pos = size - k - 1
        new_tail = head
        for _ in range(new_tail_pos):
            new_tail = new_tail.next

        new_head = new_tail.next
        new_tail.next = None
        tail.next = head

        return new_head