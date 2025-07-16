import unittest
from secret_santa import secret_santa

class Test(unittest.TestCase):
    def test_1(self):        
        self.assertEqual(secret_santa(['a', 'b', 'c']),'a')


if __name__ == "__main__":
    unittest.main()