import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public record SumOfMultiples(int level, int[] baseValues) {

    public int getSum() {
        if (level <= 0 || baseValues == null || baseValues.length == 0) {
            return 0;
        }

        Set<Integer> multiples = new HashSet<>();
        int sum = 0;

        for (int baseValue : baseValues) {
            if (baseValue > 0) {
                for (int i = baseValue; i < level; i += baseValue) {
                    if (multiples.add(i)) {
                        sum += i;
                    }
                }
            }
        }

        return sum;
    }
}