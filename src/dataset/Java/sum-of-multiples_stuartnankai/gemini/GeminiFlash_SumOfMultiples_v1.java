import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

class SumOfMultiples {
    private int number;
    private int[] set;

    SumOfMultiples(int number, int[] set) {
        this.number = number;
        this.set = Arrays.stream(set).filter(x -> x > 0).toArray(); // Filter out non-positive numbers
        Arrays.sort(this.set); // Sort the set for efficiency
    }

    int getSum() {
        if (set.length == 0 || number <= 0) {
            return 0;
        }

        Set<Integer> multiples = new HashSet<>();
        int sum = 0;

        for (int multipleBase : set) {
            if (multipleBase >= number) {
                break; // Optimization: If the base is already >= number, no need to check further
            }
            for (int j = multipleBase; j < number; j += multipleBase) {
                if (multiples.add(j)) { // Use Set to efficiently check for duplicates
                    sum += j;
                }
            }
        }

        return sum;
    }
}