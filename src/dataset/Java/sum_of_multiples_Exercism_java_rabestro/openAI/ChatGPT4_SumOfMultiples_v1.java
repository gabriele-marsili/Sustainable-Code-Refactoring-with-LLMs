import java.util.HashSet;
import java.util.Set;

public record SumOfMultiples(int level, int[] baseValues) {
    private void addMultiples(int factor, Set<Integer> multiplesSet) {
        for (int i = factor; i < level; i += factor) {
            multiplesSet.add(i);
        }
    }

    public int getSum() {
        Set<Integer> multiplesSet = new HashSet<>();
        for (int baseValue : baseValues) {
            if (baseValue > 0) {
                addMultiples(baseValue, multiplesSet);
            }
        }
        return multiplesSet.stream().mapToInt(Integer::intValue).sum();
    }
}