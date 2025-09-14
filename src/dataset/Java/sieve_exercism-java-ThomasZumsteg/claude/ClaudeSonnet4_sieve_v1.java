import java.util.List;
import java.util.ArrayList;

public class Sieve {
    private boolean[] sieve;

    public Sieve(int limit) {
        sieve = new boolean[limit + 1];
    }

    public List<Integer> getPrimes() {
        if (sieve.length <= 2) {
            return new ArrayList<>();
        }
        
        // Mark even numbers as composite (except 2)
        for (int i = 4; i < sieve.length; i += 2) {
            sieve[i] = true;
        }
        
        // Sieve odd numbers only
        int sqrtLimit = (int) Math.sqrt(sieve.length - 1);
        for (int i = 3; i <= sqrtLimit; i += 2) {
            if (!sieve[i]) {
                for (int m = i * i; m < sieve.length; m += 2 * i) {
                    sieve[m] = true;
                }
            }
        }
        
        // Collect primes
        List<Integer> primes = new ArrayList<>();
        if (sieve.length > 2) {
            primes.add(2);
        }
        
        for (int i = 3; i < sieve.length; i += 2) {
            if (!sieve[i]) {
                primes.add(i);
            }
        }
        
        return primes;
    }
}