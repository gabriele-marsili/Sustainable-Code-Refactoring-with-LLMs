class PrimeCalculator {

    int nth(int nth) {
        if (nth < 1) {
            throw new IllegalArgumentException("There is no zeroth prime");
        }

        if (nth == 1) return 2;

        int count = 1;
        int number = 3;

        while (count < nth) {
            if (isPrime(number)) {
                count++;
            }
            if (count == nth) break;
            number += 2;
        }

        return number;
    }

    private boolean isPrime(int number) {
        if (number <= 3) {
            return number > 1;
        }

        if (number % 2 == 0 || number % 3 == 0) {
            return false;
        }

        for (int i = 5; i * i <= number; i = i + 6) {
            if (number % i == 0 || number % (i + 2) == 0) {
                return false;
            }
        }

        return true;
    }
}