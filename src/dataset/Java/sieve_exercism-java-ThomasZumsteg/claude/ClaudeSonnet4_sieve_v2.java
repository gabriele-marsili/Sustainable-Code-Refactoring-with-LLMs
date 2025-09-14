import java.util.List;
import java.util.ArrayList;

public class Sieve {
    private boolean[] sieve;
    private final int limit;

    public Sieve(int limit) {
        this.limit = limit;
        sieve = new boolean[limit + 1];
    }

    public List<Integer> getPrimes() {
        if (limit < 2) return new ArrayList<>();
        
        // Mark even numbers as composite (except 2)
        for (int i = 4; i <= limit; i += 2) {
            sieve[i] = true;
        }
        
        List<Integer> primes = new ArrayList<>();
        primes.add(2);
        
        // Only check odd numbers
        for (int i = 3; i <= limit; i += 2) {
            if (!sieve[i]) {
                primes.add(i);
                // Start marking from i*i and only mark odd multiples
                if ((long) i * i <= limit) {
                    for (int m = i * i; m <= limit; m += 2 * i) {
                        sieve[m] = true;
                    }
                }
            }
        }
        return primes;
    }
}