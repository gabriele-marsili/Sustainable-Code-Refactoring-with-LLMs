import unittest
from ll_helpers import build_ll
from is_ascending_ll import is_ascending_ll

class Test(unittest.TestCase):
    def test_is_ascending_ll_1(self):
        self.assertTrue(is_ascending_ll(build_ll([-5, 10, 99, 123456])))

    def test_is_ascending_ll_2(self):
        self.assertFalse(is_ascending_ll(build_ll([2, 3, 3, 4, 5])))

if __name__ == "__main__":
    unittest.main()