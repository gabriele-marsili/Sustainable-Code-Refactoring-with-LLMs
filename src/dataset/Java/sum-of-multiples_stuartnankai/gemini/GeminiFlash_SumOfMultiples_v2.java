import java.util.HashSet;
import java.util.Set;

class SumOfMultiples {
    private int number;
    private int[] set;

    SumOfMultiples(int number, int[] set) {
        this.number = number;
        this.set = set;
    }

    int getSum() {
        if (set.length == 0 || number <= 0) {
            return 0;
        }

        Set<Integer> multiples = new HashSet<>();
        int sum = 0;

        for (int factor : set) {
            if (factor != 0) { // Avoid division by zero
                for (int multiple = factor; multiple < number; multiple += factor) {
                    if (multiples.add(multiple)) {
                        sum += multiple;
                    }
                }
            }
        }

        return sum;
    }
}