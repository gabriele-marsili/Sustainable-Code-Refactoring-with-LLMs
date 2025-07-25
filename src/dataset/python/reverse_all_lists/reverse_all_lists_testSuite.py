import unittest
from reverse_all_lists import reverse_all_lists

class TestReverseAllLists(unittest.TestCase):
    def test_reverse_all_lists_1(self):
        self.assertEqual(reverse_all_lists([1, [2, 3, 4, 'yeah'], 5]), [5, ['yeah', 4, 3, 2], 1])

    def test_reverse_all_lists_2(self):
        self.assertEqual(reverse_all_lists([42, [99, [17, [33, ['boo!']]]]]), [[[[['boo!'], 33], 17], 99], 42])

if __name__ == "__main__":
    unittest.main()