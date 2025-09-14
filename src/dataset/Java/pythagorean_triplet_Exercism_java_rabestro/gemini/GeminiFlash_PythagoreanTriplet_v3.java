import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

record PythagoreanTriplet(int a, int b, int c) {
    private static final int smallestPossibleA = 3;

    public static TripletListBuilder makeTripletsList() {
        return new TripletListBuilder();
    }

    public static class TripletListBuilder {
        private int sum;
        private int maxFactor;

        public TripletListBuilder thatSumTo(int sum) {
            this.sum = sum;
            return this;
        }

        public TripletListBuilder withFactorsLessThanOrEqualTo(int maxFactor) {
            this.maxFactor = maxFactor;
            return this;
        }

        private Optional<PythagoreanTriplet> fromA(int a) {
            if (sum <= 0 || a <= 0) {
                return Optional.empty();
            }

            int numerator = (sum * sum) - (2 * sum * a);
            int denominator = 2 * (sum - a);

            if (denominator <= 0 || numerator % denominator != 0) {
                return Optional.empty();
            }

            int b = numerator / denominator;

            if (a >= b) {
                return Optional.empty();
            }

            int c = sum - a - b;

            if (c <= 0 || (maxFactor > 0 && c > maxFactor)) {
                return Optional.empty();
            }

            return Optional.of(new PythagoreanTriplet(a, b, c));
        }

        List<PythagoreanTriplet> build() {
            List<PythagoreanTriplet> triplets = new ArrayList<>();
            int limit = sum / 3;

            for (int a = smallestPossibleA; a <= limit; a++) {
                fromA(a).ifPresent(triplets::add);
            }

            return triplets;
        }
    }
}