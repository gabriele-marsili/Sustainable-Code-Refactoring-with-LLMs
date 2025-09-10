class Solution:
    def connect(self, root: 'Node') -> 'Node':
        if not root:
            return None

        cur = root
        while cur and cur.left:
            next_level = cur.left
            while cur:
                cur.left.next = cur.right
                if cur.next:
                    cur.right.next = cur.next.left
                cur = cur.next
            cur = next_level

        return root