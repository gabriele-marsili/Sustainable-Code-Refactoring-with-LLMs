import unittest

from reverse_ascending_sublists import reverse_ascending_sublists

class TestReverseAscendingSublists(unittest.TestCase):

    def test_1(self):
        self.assertEqual(
            reverse_ascending_sublists([1, 2, 3, 4, 5]),
            [5, 4, 3, 2, 1]
        )

    def test_2(self):
        self.assertEqual(
            reverse_ascending_sublists([5, 4, 3, 2, 1]),
            [5, 4, 3, 2, 1]
        )

    def test_3(self):
        self.assertEqual(
            reverse_ascending_sublists([5, 7, 10, 4, 2, 7, 8, 1, 3]),
            [10, 7, 5, 4, 8, 7, 2, 3, 1]
        )


if __name__ == "__main__":
    unittest.main()
