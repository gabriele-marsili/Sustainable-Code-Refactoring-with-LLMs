import java.util.ArrayList;
import java.util.List;

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

        private PythagoreanTriplet fromA(int a) {
            int numerator = (sum * sum) - (2 * sum * a);
            int denominator = 2 * (sum - a);
            if (numerator % denominator != 0) return null;
            int b = numerator / denominator;
            if (a >= b) return null;
            int c = sum - a - b;
            if (maxFactor > 0 && c > maxFactor) return null;
            return new PythagoreanTriplet(a, b, c);
        }

        List<PythagoreanTriplet> build() {
            List<PythagoreanTriplet> triplets = new ArrayList<>();
            for (int a = smallestPossibleA; a <= sum / 3; a++) {
                PythagoreanTriplet triplet = fromA(a);
                if (triplet != null) {
                    triplets.add(triplet);
                }
            }
            return triplets;
        }
    }
}