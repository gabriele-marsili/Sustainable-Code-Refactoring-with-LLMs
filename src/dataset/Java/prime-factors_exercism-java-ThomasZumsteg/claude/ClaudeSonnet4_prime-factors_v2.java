import java.util.List;
import java.util.ArrayList;

public class PrimeFactors {
    public static List<Long> getForNumber(long number) {
        if(number <= 1L) return new ArrayList<>();
        
        List<Long> primes = new ArrayList<>();
        
        // Handle factor 2 separately
        while(number % 2 == 0) {
            primes.add(2L);
            number /= 2;
        }
        
        // Check odd factors from 3 onwards
        for(long i = 3; i * i <= number; i += 2) {
            while(number % i == 0) {
                primes.add(i);
                number /= i;
            }
        }
        
        // If number > 1, then it's a prime factor
        if(number > 1) {
            primes.add(number);
        }
        
        return primes;
    }
}