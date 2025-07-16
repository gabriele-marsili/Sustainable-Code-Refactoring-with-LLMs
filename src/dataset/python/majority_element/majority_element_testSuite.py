import unittest
from majority_element import majority_element_1, majority_element_2, majority_element_3

class TestMajorityElement(unittest.TestCase):

    def test_1(self):
        arr = [3, 2, 3]
        self.assertEqual(majority_element_1(arr), 3)
        self.assertEqual(majority_element_2(arr), 3)
        self.assertEqual(majority_element_3(arr), 3)

    def test_2(self):
        arr = [2, 2, 1, 1, 1, 2, 2]
        self.assertEqual(majority_element_1(arr), 2)
        self.assertEqual(majority_element_2(arr), 2)
        self.assertEqual(majority_element_3(arr), 2)

if __name__ == "__main__":
    unittest.main()
