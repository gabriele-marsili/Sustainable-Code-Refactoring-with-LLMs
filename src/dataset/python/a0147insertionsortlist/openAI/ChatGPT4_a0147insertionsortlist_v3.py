from utils.list.ListNode import ListNode

class Solution:
    def insertionSortList(self, head: ListNode) -> ListNode:
        if not head or not head.next:
            return head

        dummy = ListNode(0)
        current = head

        while current:
            next_node = current.next
            prev, node = dummy, dummy.next

            while node and node.val < current.val:
                prev = node
                node = node.next

            current.next = node
            prev.next = current
            current = next_node

        return dummy.next