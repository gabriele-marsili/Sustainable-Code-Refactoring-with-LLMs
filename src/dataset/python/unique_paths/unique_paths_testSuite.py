import unittest
from unique_paths import unique_paths, unique_paths_dp

class Test(unittest.TestCase):
    def test_unique_paths(self):
        n, m = 7, 7
        self.assertEqual(unique_paths(n, m), 924)
        self.assertEqual(unique_paths_dp(n, m), 924)

        n, m = 7, 3
        self.assertEqual(unique_paths(n, m), 28)
        self.assertEqual(unique_paths_dp(n, m), 28)

        n, m = 3, 7
        self.assertEqual(unique_paths(n, m), 28)
        self.assertEqual(unique_paths_dp(n, m), 28)

if __name__ == "__main__":
    unittest.main()