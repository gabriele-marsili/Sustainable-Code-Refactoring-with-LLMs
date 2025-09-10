import java.util.ArrayList;
import java.util.List;

public class PythagoreanTriplet {
    private final int a, b, c;

    public PythagoreanTriplet(int a, int b, int c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    int calculateSum() {
        return a + b + c;
    }

    long calculateProduct() {
        return (long) a * b * c;
    }

    boolean isPythagorean() {
        return a * a + b * b == c * c;
    }

    static PythagoreanTripletBuilder makeTripletsList() {
        return new PythagoreanTripletBuilder();
    }

    static class PythagoreanTripletBuilder {
        private int bottom = 1;
        private int top = Integer.MAX_VALUE;
        private Integer sum;

        PythagoreanTripletBuilder withFactorsGreaterThanOrEqualTo(int lower) {
            this.bottom = lower;
            return this;
        }

        PythagoreanTripletBuilder withFactorsLessThanOrEqualTo(int upper) {
            this.top = upper;
            return this;
        }

        PythagoreanTripletBuilder thatSumTo(int sum) {
            this.sum = sum;
            return this;
        }

        List<PythagoreanTriplet> build() {
            List<PythagoreanTriplet> result = new ArrayList<>();
            for (int a = bottom; a <= top / 3; a++) {
                for (int b = a + 1; b <= top / 2; b++) {
                    int c = sum != null ? sum - a - b : (int) Math.sqrt(a * a + b * b);
                    if (c > b && c <= top && a * a + b * b == c * c) {
                        if (sum == null || a + b + c == sum) {
                            result.add(new PythagoreanTriplet(a, b, c));
                        }
                    }
                }
            }
            return result;
        }
    }
}