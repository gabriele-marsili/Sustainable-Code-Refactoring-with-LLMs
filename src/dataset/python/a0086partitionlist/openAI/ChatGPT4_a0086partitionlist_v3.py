from utils.list.ListNode import ListNode

class Solution:
    def partition(self, head: ListNode, x: int) -> ListNode:
        dummy_head = ListNode(0)
        dummy_pivot = ListNode(0)
        prev_tail, post_tail = dummy_head, dummy_pivot

        while head:
            if head.val < x:
                prev_tail.next = head
                prev_tail = prev_tail.next
            else:
                post_tail.next = head
                post_tail = post_tail.next
            head = head.next

        prev_tail.next = dummy_pivot.next
        post_tail.next = None
        return dummy_head.next