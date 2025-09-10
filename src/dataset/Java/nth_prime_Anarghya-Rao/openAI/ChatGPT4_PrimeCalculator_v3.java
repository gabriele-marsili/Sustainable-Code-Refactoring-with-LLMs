import java.util.ArrayList;
import java.util.List;

class PrimeCalculator {

    int nth(int nth) {
        if (nth < 1)
            throw new IllegalArgumentException();

        List<Integer> primes = new ArrayList<>();
        primes.add(2);
        int candidate = 3;

        while (primes.size() < nth) {
            boolean isPrime = true;
            int sqrt = (int) Math.sqrt(candidate);
            for (int prime : primes) {
                if (prime > sqrt) break;
                if (candidate % prime == 0) {
                    isPrime = false;
                    break;
                }
            }
            if (isPrime) {
                primes.add(candidate);
            }
            candidate += 2;
        }

        return primes.get(nth - 1);
    }
}