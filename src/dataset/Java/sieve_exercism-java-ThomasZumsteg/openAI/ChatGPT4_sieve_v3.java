import java.util.List;
import java.util.ArrayList;

public class Sieve {
    private final boolean[] sieve;

    public Sieve(int limit) {
        sieve = new boolean[limit + 1];
    }

    public List<Integer> getPrimes() {
        List<Integer> primes = new ArrayList<>();
        int limit = sieve.length;
        if (limit > 2) primes.add(2);
        for (int i = 3; i < limit; i += 2) {
            if (!sieve[i]) {
                primes.add(i);
                if ((long) i * i < limit) {
                    for (int m = i * i; m < limit; m += i << 1) {
                        sieve[m] = true;
                    }
                }
            }
        }
        return primes;
    }
}