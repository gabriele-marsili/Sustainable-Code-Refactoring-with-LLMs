import java.util.ArrayList;
import java.util.List;

public class PrimeFactors {
    public static List<Long> getForNumber(long number) {
        List<Long> primes = new ArrayList<>();
        if (number <= 1L) return primes;
        while (number % 2 == 0) {
            primes.add(2L);
            number /= 2;
        }
        for (long i = 3; i * i <= number; i += 2) {
            while (number % i == 0) {
                primes.add(i);
                number /= i;
            }
        }
        if (number > 1) primes.add(number);
        return primes;
    }
}