import unittest
from jump_game_2 import jump_game_2

class TestJumpGame(unittest.TestCase):
    def test_jump_game(self):
        nums = [2, 3, 1, 1, 4]
        self.assertEqual(jump_game_2(nums), 2)

if __name__ == "__main__":
    unittest.main()