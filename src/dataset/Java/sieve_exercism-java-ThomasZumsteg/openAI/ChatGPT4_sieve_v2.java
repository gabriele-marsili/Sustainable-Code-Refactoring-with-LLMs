import java.util.List;
import java.util.ArrayList;

public class Sieve {
    private boolean[] sieve;

    public Sieve(int limit) {
        sieve = new boolean[limit + 1];
    }

    public List<Integer> getPrimes() {
        List<Integer> primes = new ArrayList<>();
        int limit = sieve.length;
        if (limit > 2) primes.add(2);
        for (int i = 3; i * i < limit; i += 2) {
            if (!sieve[i]) {
                for (int m = i * i; m < limit; m += i * 2) {
                    sieve[m] = true;
                }
            }
        }
        for (int i = 3; i < limit; i += 2) {
            if (!sieve[i]) primes.add(i);
        }
        return primes;
    }
}