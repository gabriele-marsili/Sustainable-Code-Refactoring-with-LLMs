class Solution:
    def copyRandomList(self, head: 'Node') -> 'Node':
        if not head:
            return None

        # Step 1: Interweave the original list with cloned nodes
        node = head
        while node:
            next_node = node.next
            cloned = Node(node.val, next_node, None)
            node.next = cloned
            node = next_node

        # Step 2: Assign random pointers for the cloned nodes
        node = head
        while node:
            if node.random:
                node.next.random = node.random.next
            node = node.next.next

        # Step 3: Separate the original and cloned lists
        node = head
        cloned_head = head.next
        while node:
            cloned = node.next
            node.next = cloned.next
            node = node.next
            if node:
                cloned.next = node.next

        return cloned_head


class Node:
    def __init__(self, val, next=None, random=None):
        self.val = val
        self.next = next
        self.random = random