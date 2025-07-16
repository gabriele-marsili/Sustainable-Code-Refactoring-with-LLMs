import unittest
from jump_game import can_jump

class Test(unittest.TestCase):
    def test_1(self):        
        self.assertEqual(can_jump([3, 2, 1, 0, 4]),False)
    def test_2(self):        
        self.assertEqual(can_jump([2, 3, 1, 1, 4]),True)



if __name__ == "__main__":
    unittest.main()