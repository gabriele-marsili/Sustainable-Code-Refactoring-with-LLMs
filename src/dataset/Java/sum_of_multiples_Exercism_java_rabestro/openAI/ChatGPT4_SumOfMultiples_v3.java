import java.util.HashSet;
import java.util.Set;

public record SumOfMultiples(int level, int[] baseValues) {
    private Set<Integer> multiples(int factor) {
        Set<Integer> result = new HashSet<>();
        for (int i = factor; i < level; i += factor) {
            result.add(i);
        }
        return result;
    }

    public int getSum() {
        Set<Integer> uniqueMultiples = new HashSet<>();
        for (int baseValue : baseValues) {
            if (baseValue > 0) {
                uniqueMultiples.addAll(multiples(baseValue));
            }
        }
        return uniqueMultiples.stream().mapToInt(Integer::intValue).sum();
    }
}