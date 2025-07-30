import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;

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
            int numerator = (sum * sum) - (2 * sum * a);
            int denominator = 2 * (sum - a);
            int remainder = numerator % denominator;
            if (remainder != 0)
                return Optional.empty();
            int b = numerator / denominator;
            if (a >= b)
                return Optional.empty();
            int c = sum - a - b;
            if (maxFactor > 0 && c > maxFactor)
                return Optional.empty();
            return Optional.of(new PythagoreanTriplet(a, b, c));
        }

        List<PythagoreanTriplet> build() {
            return IntStream
                    .rangeClosed(smallestPossibleA, sum / 3)
                    .mapToObj(this::fromA)
                    .flatMap(Optional::stream)
                    .toList();
        }
    }
}
