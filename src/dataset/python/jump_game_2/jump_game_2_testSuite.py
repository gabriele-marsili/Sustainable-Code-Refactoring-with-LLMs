import unittest
from jump_game_2 import min_jumps_1

class TestJumpGame(unittest.TestCase):
    def test_jump_game(self):
        nums = [2, 3, 1, 1, 4]
        self.assertEqual(min_jumps_1(nums), 2)

if __name__ == "__main__":
    unittest.main()