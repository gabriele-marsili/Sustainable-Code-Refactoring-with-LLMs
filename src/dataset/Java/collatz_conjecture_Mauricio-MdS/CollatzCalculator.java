class CollatzCalculator {

    public int computeStepCount(int number) {
        if (number < 1) throw new IllegalArgumentException("Only positive integers are allowed");
        int steps = 0;

        while (number != 1) {
            steps++;
            number = nextCollatz(number);
        }

        return steps;
    }

    private int nextCollatz(int number) {
        return number % 2 == 0 ?
                number / 2 :
                3 * number + 1;
    }
}
