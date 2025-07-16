import unittest
from running_median import running_median

class TestRunningMedian(unittest.TestCase):

    def test_running_median(self):
        result = running_median([2, 1, 5, 7, 2, 0, 5])
        self.assertEqual(result, [2, 1.5, 2, 3.5, 2, 2, 2])

if __name__ == "__main__":
    unittest.main()