import java.util.List;
import java.util.ArrayList;

public class Sieve {
    private boolean[] sieve;
    private final int limit;

    public Sieve(int limit) {
        this.limit = limit;
        this.sieve = new boolean[limit + 1];
        if (limit >= 2) {
            initializeSieve();
        }
    }

    private void initializeSieve() {
        for (int i = 0; i < sieve.length; i += 2) {
            sieve[i] = true;
        }
        sieve[2] = false;
        
        int sqrtLimit = (int) Math.sqrt(limit);
        for (int i = 3; i <= sqrtLimit; i += 2) {
            if (!sieve[i]) {
                int step = i << 1;
                for (int m = i * i; m <= limit; m += step) {
                    sieve[m] = true;
                }
            }
        }
    }

    public List<Integer> getPrimes() {
        List<Integer> primes = new ArrayList<>();
        if (limit < 2) return primes;
        
        primes.add(2);
        for (int i = 3; i <= limit; i += 2) {
            if (!sieve[i]) {
                primes.add(i);
            }
        }
        return primes;
    }
}