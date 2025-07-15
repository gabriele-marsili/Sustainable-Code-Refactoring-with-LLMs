import unittest
from container_with_most_water import max_area

class Test(unittest.TestCase):
    def test_1(self):
        # Correct result => 49
        self.assertEqual(max_area([1, 8, 6, 2, 5, 4, 8, 3, 7]),49)



if __name__ == "__main__":
    unittest.main()