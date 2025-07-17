import unittest
from transform_number_ascending_digits import operations

class Test(unittest.TestCase):
    def test_operations(self):
        self.assertEqual(operations('901'), 1)
        self.assertEqual(operations('301'), 3)
        self.assertEqual(operations('5982'), 4)

if __name__ == "__main__":
    unittest.main()