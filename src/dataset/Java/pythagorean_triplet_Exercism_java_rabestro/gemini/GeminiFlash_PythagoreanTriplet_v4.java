import java.util.ArrayList;
import java.util.List;

record PythagoreanTriplet(int a, int b, int c) {
    private static final int smallestPossibleA = 3;

    public static TripletListBuilder makeTripletsList() {
        return new TripletListBuilder();
    }

    public static class TripletListBuilder {
        private int sum;
        private int maxFactor = Integer.MAX_VALUE;

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
            int limit = Math.min(sum / 3, maxFactor);

            for (int a = smallestPossibleA; a <= limit; a++) {
                int numerator = (sum * sum) - (2 * sum * a);
                int denominator = 2 * (sum - a);

                if (numerator % denominator == 0) {
                    int b = numerator / denominator;

                    if (a < b) {
                        int c = sum - a - b;
                        if (c <= maxFactor) {
                            triplets.add(new PythagoreanTriplet(a, b, c));
                        }
                    }
                }
            }

            return triplets;
        }
    }
}