import java.util.BitSet;

public record SumOfMultiples(int level, int[] baseValues) {
    
    public int getSum() {
        if (level <= 1 || baseValues == null || baseValues.length == 0) {
            return 0;
        }
        
        BitSet seen = new BitSet(level);
        int sum = 0;
        
        for (int baseValue : baseValues) {
            if (baseValue > 0 && baseValue < level) {
                for (int multiple = baseValue; multiple < level; multiple += baseValue) {
                    if (!seen.get(multiple)) {
                        seen.set(multiple);
                        sum += multiple;
                    }
                }
            }
        }
        
        return sum;
    }
}