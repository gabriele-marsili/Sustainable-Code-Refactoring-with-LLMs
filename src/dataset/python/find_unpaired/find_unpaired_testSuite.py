import unittest
from find_unpaired import find_unpaired_element

class Test(unittest.TestCase):
    def test_1(self):        
        self.assertEqual(find_unpaired_element([1, 5, 3, 1, 5]),3)



if __name__ == "__main__":
    unittest.main()