class SumOfMultiples {
    private int number;
    private int[] set;

    SumOfMultiples(int number, int[] set) {
        this.number = number;
        this.set = set;
    }

    int getSum() {
        int sum = 0;
        boolean[] multiples = new boolean[number];

        for (int factor : set) {
            if (factor != 0) {
                for (int i = factor; i < number; i += factor) {
                    if (!multiples[i]) {
                        sum += i;
                        multiples[i] = true;
                    }
                }
            }
        }

        return sum;
    }
}