import unittest
from intersecting_ll import intersecting_ll
from ll_helpers import build_ll

class Test(unittest.TestCase):
    def test_intersecting_node(self):
        ll1 = build_ll([3, 7, 8, 10])
        ll2 = build_ll([1, 8, 10])
        self.assertEqual(intersecting_ll(ll1, ll2).val, 8)

if __name__ == "__main__":
    unittest.main()