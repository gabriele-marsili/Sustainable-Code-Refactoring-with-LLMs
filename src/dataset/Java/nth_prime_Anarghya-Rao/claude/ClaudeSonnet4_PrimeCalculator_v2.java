class PrimeCalculator {

    int nth(int nth) {
        if(nth < 1)
            throw new IllegalArgumentException();
        
        if(nth == 1) return 2;
        
        int counter = 1; // Start with 2 as first prime
        int candidate = 3; // Start checking from 3
        
        while(counter < nth) {
            if(isPrime(candidate)) {
                counter++;
            }
            if(counter < nth) {
                candidate += 2; // Skip even numbers
            }
        }
        
        return candidate;
    }
    
    private boolean isPrime(int n) {
        if(n <= 1) return false;
        if(n <= 3) return true;
        if(n % 2 == 0 || n % 3 == 0) return false;
        
        // Check divisors of form 6k ± 1 up to √n
        int limit = (int)Math.sqrt(n);
        for(int i = 5; i <= limit; i += 6) {
            if(n % i == 0 || n % (i + 2) == 0) {
                return false;
            }
        }
        return true;
    }
}