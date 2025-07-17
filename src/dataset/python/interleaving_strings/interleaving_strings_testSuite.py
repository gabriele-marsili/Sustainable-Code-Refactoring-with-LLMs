import unittest
from interleaving_strings import interleaving_strings_1

class TestInterleavingStrings(unittest.TestCase):
    def test_interleaving_strings(self):
        a, b, c = 'xy', 'xz', 'xxyz'
        self.assertEqual(interleaving_strings_1(a, b, c), True)

if __name__ == "__main__":
    unittest.main()