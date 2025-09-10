import java.util.HashSet;
import java.util.Set;

public record SumOfMultiples(int level, int[] baseValues) {
    public int getSum() {
        Set<Integer> uniqueMultiples = new HashSet<>();
        for (int baseValue : baseValues) {
            if (baseValue > 0) {
                for (int multiple = baseValue; multiple < level; multiple += baseValue) {
                    uniqueMultiples.add(multiple);
                }
            }
        }
        return uniqueMultiples.stream().mapToInt(Integer::intValue).sum();
    }
}