import unittest
from find_el_smaller_left_bigger_right import find_element_smaller_left_bigger_right


class Test(unittest.TestCase):
    def test_1(self):        
        self.assertEqual(find_element_smaller_left_bigger_right([5, 1, 4, 3, 6, 8, 10, 7, 9]),6)
    def test_2(self):        
        self.assertEqual(find_element_smaller_left_bigger_right([5, 1, 4, 4]),-1)
    def test_3(self):        
        self.assertEqual(find_element_smaller_left_bigger_right([5, 1, 4, 6, 4, 7, 14, 8, 19]),7)
    def test_4(self):        
        self.assertEqual(find_element_smaller_left_bigger_right([4, 2, 5, 7]),5)
    def test_5(self):        
        self.assertEqual(find_element_smaller_left_bigger_right([11, 9, 12]),-1)    
    def test_6(self):        
        self.assertEqual(find_element_smaller_left_bigger_right([177, 234, 236, 276, 519, 606, 697, 842, 911, 965, 1086, 1135, 1197, 1273, 1392, 1395, 1531, 1542, 1571, 1682, 2007, 2177, 2382, 2410, 2432, 2447, 2598, 2646, 2672, 2826, 2890, 2899, 2916, 2955, 3278, 3380, 3623, 3647, 3690, 4186, 4300, 4395, 4468, 4609, 4679, 4712, 4725, 4790, 4851, 4912, 4933, 4942, 5156, 5186, 5188, 5244, 5346, 5538, 5583, 5742, 5805, 5830, 6010, 6140, 6173, 6357, 6412, 6414, 6468, 6582, 6765, 7056, 7061, 7089, 7250, 7275, 7378, 7381, 7396, 7410, 7419, 7511, 7625, 7639, 7655, 7776, 7793, 8089, 8245, 8622, 8758, 8807, 8969, 9022, 9149, 9150, 9240, 9273, 9573, 9938]),234)
    


if __name__ == "__main__":
    unittest.main()