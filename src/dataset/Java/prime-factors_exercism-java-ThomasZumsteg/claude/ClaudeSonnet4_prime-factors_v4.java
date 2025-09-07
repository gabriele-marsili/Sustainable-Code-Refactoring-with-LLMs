import java.util.List;
import java.util.ArrayList;

public class PrimeFactors {
    public static List<Long> getForNumber(long number) {
        if (number <= 1L) return new ArrayList<>();
        
        List<Long> primes = new ArrayList<>();
        
        while ((number & 1) == 0) {
            primes.add(2L);
            number >>>= 1;
        }
        
        for (long i = 3L; i * i <= number; i += 2L) {
            while (number % i == 0) {
                primes.add(i);
                number /= i;
            }
        }
        
        if (number > 1L) {
            primes.add(number);
        }
        
        return primes;
    }
}