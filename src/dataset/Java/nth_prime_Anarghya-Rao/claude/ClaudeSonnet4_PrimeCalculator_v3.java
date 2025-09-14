class PrimeCalculator {

    int nth(int nth) {
        if(nth < 1)
            throw new IllegalArgumentException();
        
        if(nth == 1) return 2;
        if(nth == 2) return 3;
        
        int counter = 2;
        int candidate = 5;
        
        while(counter < nth) {
            if(isPrime(candidate)) {
                counter++;
            }
            candidate += 2;
        }
        
        return candidate - 2;
    }
    
    private boolean isPrime(int n) {
        if(n % 2 == 0) return false;
        if(n % 3 == 0) return false;
        
        int limit = (int)Math.sqrt(n);
        for(int i = 5; i <= limit; i += 6) {
            if(n % i == 0 || n % (i + 2) == 0) {
                return false;
            }
        }
        return true;
    }
}