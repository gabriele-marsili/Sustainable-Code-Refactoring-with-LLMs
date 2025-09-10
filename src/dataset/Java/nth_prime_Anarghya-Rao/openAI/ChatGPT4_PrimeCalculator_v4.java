class PrimeCalculator {

    int nth(int nth) {
        if (nth < 1)
            throw new IllegalArgumentException();

        int count = 0;
        int number = 1;

        while (count < nth) {
            number++;
            if (isPrime(number)) {
                count++;
            }
        }

        return number;
    }

    private boolean isPrime(int num) {
        if (num < 2) return false;
        if (num == 2 || num == 3) return true;
        if (num % 2 == 0 || num % 3 == 0) return false;
        for (int i = 5; i * i <= num; i += 6) {
            if (num % i == 0 || num % (i + 2) == 0) return false;
        }
        return true;
    }
}