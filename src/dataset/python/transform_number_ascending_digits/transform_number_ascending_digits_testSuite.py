import unittest
from transform_number_ascending_digits import transform_number_ascending_digits

class Test(unittest.TestCase):
    def test_operations(self):
        self.assertEqual(transform_number_ascending_digits('901'), 1)
        self.assertEqual(transform_number_ascending_digits('301'), 3)
        self.assertEqual(transform_number_ascending_digits('5982'), 4)

if __name__ == "__main__":
    unittest.main()