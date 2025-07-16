import unittest
from random_sample import reservoir_sampling, probabilistic_sampling

class TestSampling(unittest.TestCase):

    def test_sampling_length_and_elements(self):
        arr = [1, 2, 3, 4]
        k = 2
        # Verifica la lunghezza e che tutti gli elementi appartengano all'array originale
        for _ in range(10):  # esegui il test più volte per probabilità diverse
            res1 = reservoir_sampling(arr, k)
            res2 = probabilistic_sampling(arr, k)
            
            self.assertEqual(len(res1), k)
            self.assertEqual(len(res2), k)

            for val in res1:
                self.assertIn(val, arr)
            for val in res2:
                self.assertIn(val, arr)
    
    def test_sampling_variety(self):
        # Verifica che risultati diversi siano possibili nel tempo
        arr = [1, 2, 3, 4]
        k = 2
        seen = set()
        for _ in range(100):
            result = tuple(sorted(reservoir_sampling(arr, k)))
            seen.add(result)
        # Assicurati che ci sia varietà
        self.assertGreater(len(seen), 1)

        seen = set()
        for _ in range(100):
            result = tuple(sorted(probabilistic_sampling(arr, k)))
            seen.add(result)
        self.assertGreater(len(seen), 1)


if __name__ == "__main__":
    unittest.main()
