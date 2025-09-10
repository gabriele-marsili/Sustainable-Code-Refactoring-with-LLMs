import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public record SumOfMultiples(int level, int[] baseValues) {

    public int getSum() {
        Set<Integer> multiples = new HashSet<>();
        for (int baseValue : baseValues) {
            if (baseValue > 0) {
                for (int i = baseValue; i < level; i += baseValue) {
                    multiples.add(i);
                }
            }
        }
        int sum = 0;
        for (int multiple : multiples) {
            sum += multiple;
        }
        return sum;
    }
}