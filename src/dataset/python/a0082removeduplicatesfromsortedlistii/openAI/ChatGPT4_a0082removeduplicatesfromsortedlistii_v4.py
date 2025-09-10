from utils.list.ListNode import ListNode

class Solution:
    def deleteDuplicates(self, head: ListNode) -> ListNode:
        dummy = ListNode(0, head)
        prev = dummy

        while head:
            if head.next and head.val == head.next.val:
                val = head.val
                while head and head.val == val:
                    head = head.next
                prev.next = head
            else:
                prev = prev.next
                head = head.next
        return dummy.next