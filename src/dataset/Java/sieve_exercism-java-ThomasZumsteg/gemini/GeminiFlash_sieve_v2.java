import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;

public class Sieve {
    private boolean[] sieve;
    private int limit;

    public Sieve(int limit) {
        this.limit = limit;
        sieve = new boolean[limit + 1];
    }

    public List<Integer> getPrimes() {
        if (limit < 2) {
            return new ArrayList<>();
        }

        Arrays.fill(sieve, false);
        List<Integer> primes = new ArrayList<>();
        primes.add(2);

        int crossLimit = (int) Math.sqrt(limit);

        for (int i = 3; i <= crossLimit; i += 2) {
            if (!sieve[i]) {
                for (int m = i * i; m <= limit; m += 2 * i) {
                    sieve[m] = true;
                }
            }
        }

        for (int i = 3; i <= limit; i += 2) {
            if (!sieve[i]) {
                primes.add(i);
            }
        }

        return primes;
    }
}