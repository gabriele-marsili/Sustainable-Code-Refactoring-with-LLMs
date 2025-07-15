import unittest
from longest_substring_without_repeating_characters import length_of_longest_substring

class Test(unittest.TestCase):
    def test_1(self):        
        self.assertEqual(length_of_longest_substring('abcabcbb'),3)
     
    def test_2(self):        
        self.assertEqual(length_of_longest_substring('bbbbb'),1)



if __name__ == "__main__":
    unittest.main()