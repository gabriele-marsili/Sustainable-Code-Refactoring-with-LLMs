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
        if (set.length == 0 || number <= 1) {
            return 0;
        }
        
        Set<Integer> multiples = new HashSet<>();
        
        for (int factor : set) {
            if (factor > 0 && factor < number) {
                for (int multiple = factor; multiple < number; multiple += factor) {
                    multiples.add(multiple);
                }
            }
        }
        
        return multiples.stream().mapToInt(Integer::intValue).sum();
    }
}