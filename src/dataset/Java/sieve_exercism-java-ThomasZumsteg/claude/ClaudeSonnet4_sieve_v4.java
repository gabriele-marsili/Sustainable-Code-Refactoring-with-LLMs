import java.util.List;
import java.util.ArrayList;

public class Sieve {
    private boolean[] sieve;

    public Sieve(int limit) {
        sieve = new boolean[limit + 1];
        if (limit >= 2) {
            generateSieve();
        }
    }

    private void generateSieve() {
        int limit = sieve.length - 1;
        int sqrtLimit = (int) Math.sqrt(limit);
        
        for (int i = 3; i <= sqrtLimit; i += 2) {
            if (!sieve[i]) {
                for (int m = i * i; m <= limit; m += i + i) {
                    sieve[m] = true;
                }
            }
        }
    }

    public List<Integer> getPrimes() {
        if (sieve.length <= 2) {
            return new ArrayList<>();
        }
        
        int estimatedCount = Math.max(1, sieve.length / (int)(Math.log(sieve.length) * 0.8));
        List<Integer> primes = new ArrayList<>(estimatedCount);
        
        primes.add(2);
        for (int i = 3; i < sieve.length; i += 2) {
            if (!sieve[i]) {
                primes.add(i);
            }
        }
        return primes;
    }
}