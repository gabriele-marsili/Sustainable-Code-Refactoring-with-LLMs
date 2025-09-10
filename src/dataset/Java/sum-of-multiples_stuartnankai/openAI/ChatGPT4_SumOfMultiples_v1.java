import java.util.HashSet;

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

        HashSet<Integer> multiples = new HashSet<>();
        int sum = 0;

        for (int aSet : set) {
            if (aSet > 0) {
                for (int j = aSet; j < number; j += aSet) {
                    if (multiples.add(j)) {
                        sum += j;
                    }
                }
            }
        }

        return sum;
    }
}