import unittest
from power import power

class TestPowerFunction(unittest.TestCase):

    def test_power_1(self):
        self.assertEqual(power(2, 0), 1)

    def test_power_2(self):
        self.assertEqual(power(2, 1), 2)

    def test_power_3(self):
        self.assertEqual(power(2, 2), 4)

    def test_power_4(self):
        self.assertEqual(power(2, 3), 8)

    def test_power_5(self):
        self.assertEqual(power(2, 4), 16)

    def test_power_6(self):
        self.assertEqual(power(2, 5), 32)

    def test_power_7(self):
        self.assertEqual(power(2, 10), 1024)

    def test_power_8(self):
        self.assertEqual(power(2, -1), 0.5)

    def test_power_9(self):
        self.assertEqual(power(2, -2), 0.25)

    def test_power_10(self):
        self.assertEqual(power(2, -3), 0.125)

    def test_power_11(self):
        self.assertEqual(power(2, -4), 0.0625)

    def test_power_12(self):
        self.assertEqual(power(-2, 3), -8)

    def test_power_13(self):
        self.assertEqual(power(-2, 4), 16)

if __name__ == "__main__":
    unittest.main()