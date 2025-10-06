import unittest
from a0147insertionsortlist import Solution
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next



class TestInsertionSortList(unittest.TestCase):
    def create_linked_list(self, values):
        if not values:
            return None
        head = ListNode(values[0])
        current = head
        for val in values[1:]:
            current.next = ListNode(val)
            current = current.next
        return head

    def linked_list_to_list(self, head):
        values = []
        current = head
        while current:
            values.append(current.val)
            current = current.next
        return values

    def test_example_1(self):
        # Input: 4->2->1->3
        # Expected Output: 1->2->3->4
        head = self.create_linked_list([4, 2, 1, 3])
        result_head = Solution().insertionSortList(head)
        self.assertEqual(self.linked_list_to_list(result_head), [1, 2, 3, 4])

    def test_example_2(self):
        # Input: -1->5->3->4->0
        # Expected Output: -1->0->3->4->5
        head = self.create_linked_list([-1, 5, 3, 4, 0])
        result_head = Solution().insertionSortList(head)
        self.assertEqual(self.linked_list_to_list(result_head), [-1, 0, 3, 4, 5])

    def test_empty_list(self):
        # Input: None
        # Expected Output: None
        head = self.create_linked_list([])
        result_head = Solution().insertionSortList(head)
        self.assertIsNone(result_head)

    def test_single_element_list(self):
        # Input: 5
        # Expected Output: 5
        head = self.create_linked_list([5])
        result_head = Solution().insertionSortList(head)
        self.assertEqual(self.linked_list_to_list(result_head), [5])

    def test_already_sorted_list(self):
        # Input: 1->2->3->4
        # Expected Output: 1->2->3->4
        head = self.create_linked_list([1, 2, 3, 4])
        result_head = Solution().insertionSortList(head)
        self.assertEqual(self.linked_list_to_list(result_head), [1, 2, 3, 4])

    def test_reverse_sorted_list(self):
        # Input: 4->3->2->1
        # Expected Output: 1->2->3->4
        head = self.create_linked_list([4, 3, 2, 1])
        result_head = Solution().insertionSortList(head)
        self.assertEqual(self.linked_list_to_list(result_head), [1, 2, 3, 4])

    def test_list_with_duplicates(self):
        # Input: 3->1->2->3->1
        # Expected Output: 1->1->2->3->3
        head = self.create_linked_list([3, 1, 2, 3, 1])
        result_head = Solution().insertionSortList(head)
        self.assertEqual(self.linked_list_to_list(result_head), [1, 1, 2, 3, 3])

    def test_list_with_negative_and_zero(self):
        # Input: 0->-5->2->-1->-5
        # Expected Output: -5->-5->-1->0->2
        head = self.create_linked_list([0, -5, 2, -1, -5])
        result_head = Solution().insertionSortList(head)
        self.assertEqual(self.linked_list_to_list(result_head), [-5, -5, -1, 0, 2])

if __name__ == '__main__':
    unittest.main()