import unittest

# Sostituisci 'your_module' con il nome del file Python che contiene le due funzioni (senza .py)
from k_closest_points import find_k_closes_recursive, find_k_closes

class TestFindKCloses(unittest.TestCase):

    def test_1(self):
        points = [(0, 1), (3, 3), (1, 2), (2, 1.5), (3, -1), (2, 1), (4, 3), (5, 1), (-1, 2), (2, 2)]
        target = (2, 2)
        k = 3
        expected = [(2, 2), (2, 1.5), (2, 1)]
        self.assertEqual(sorted(find_k_closes_recursive(points, target, k)), sorted(expected))
        self.assertEqual(sorted(find_k_closes(points, target, k)), sorted(expected))

    def test_2(self):
        points = [(0, 1), (2, 1), (3, 3), (1, 2)]
        target = (2, 2)
        k = 2
        expected = [(1, 2), (2, 1)]
        self.assertEqual(sorted(find_k_closes_recursive(points, target, k)), sorted(expected))
        self.assertEqual(sorted(find_k_closes(points, target, k)), sorted(expected))


if __name__ == "__main__":
    unittest.main()
