import java.util.ArrayList;
import java.util.List;

record PythagoreanTriplet(int a, int b, int c) {
    private static final int SMALLEST_POSSIBLE_A = 3;

    public static TripletListBuilder makeTripletsList() {
        return new TripletListBuilder();
    }

    public static class TripletListBuilder {
        private int sum;
        private int maxFactor = Integer.MAX_VALUE; // Default to no limit

        public TripletListBuilder thatSumTo(int sum) {
            this.sum = sum;
            return this;
        }

        public TripletListBuilder withFactorsLessThanOrEqualTo(int maxFactor) {
            this.maxFactor = maxFactor;
            return this;
        }

        List<PythagoreanTriplet> build() {
            List<PythagoreanTriplet> triplets = new ArrayList<>();
            int aLimit = Math.min(sum / 3, maxFactor); // Optimization: Limit 'a' based on maxFactor
            for (int a = SMALLEST_POSSIBLE_A; a <= aLimit; a++) {
                int numerator = (sum * sum) - (2 * sum * a);
                int denominator = 2 * (sum - a);

                if (numerator % denominator == 0) {
                    int b = numerator / denominator;
                    if (a < b) {
                        int c = sum - a - b;
                        if (c <= maxFactor && c > 0) { // Ensure c is positive and within maxFactor
                            triplets.add(new PythagoreanTriplet(a, b, c));
                        }
                    }
                }
            }
            return triplets;
        }
    }
}