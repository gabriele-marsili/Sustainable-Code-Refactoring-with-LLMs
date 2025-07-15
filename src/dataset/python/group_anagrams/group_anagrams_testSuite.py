import unittest
from group_anagrams import group_anagrams

class Test(unittest.TestCase):
    def test_1(self):        
        self.assertEqual(group_anagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']),[['eat', 'ate', 'tea'], ['tan', 'nat'], ['bat']])



if __name__ == "__main__":
    unittest.main()