import unittest
from find_min_path import find_min_path

class Test(unittest.TestCase):
    def test_find_min_path(self):
        f = 'f'
        t = 't'
        self.assertEqual(find_min_path([[f, f, f, f], [t, t, f, t], [f, f, f, f], [f, f, f, f]], (3, 0), (0, 0)), 7)

if __name__ == "__main__":
    unittest.main()