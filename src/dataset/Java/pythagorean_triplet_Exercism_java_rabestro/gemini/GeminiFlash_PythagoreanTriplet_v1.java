import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

        private Optional<PythagoreanTriplet> findTriplet(int a) {
            if (a >= sum / 2) {
                return Optional.empty();
            }

            int bSquared = (sum * sum - 2 * sum * a) / (2 * (sum - a));
            if ((sum * sum - 2 * sum * a) % (2 * (sum - a)) != 0) {
                return Optional.empty();
            }

            int b = (sum * sum - 2 * sum * a) / (2 * (sum - a));

            if (a >= b) {
                return Optional.empty();
            }

            int c = sum - a - b;

            if (c <= 0 || c > maxFactor) {
                return Optional.empty();
            }

            if (a * a + b * b == c * c) {
                return Optional.of(new PythagoreanTriplet(a, b, c));
            }
            return Optional.empty();
        }


        List<PythagoreanTriplet> build() {
            List<PythagoreanTriplet> triplets = new ArrayList<>();
            int limit = Math.min(sum / 3, maxFactor);

            for (int a = SMALLEST_POSSIBLE_A; a <= limit; a++) {
                Optional<PythagoreanTriplet> triplet = findTriplet(a);
                triplet.ifPresent(triplets::add);
            }

            return triplets;
        }
    }
}