import java.util.ArrayList;
import java.util.List;

public class PythagoreanTriplet {
    private final int a;
    private final int b;
    private final int c;

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
        int bottom = 1;
        int top;
        Integer sum;

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
            if (sum != null) {
                for (int a = bottom; a <= top; a++) {
                    for (int b = a + 1; b <= top; b++) {
                        int c = sum - a - b;
                        if (c > b && c <= top) {
                            if (a * a + b * b == c * c) {
                                result.add(new PythagoreanTriplet(a, b, c));
                            }
                        }
                    }
                }
            } else {
                for (int a = bottom; a <= top; a++) {
                    for (int b = a + 1; b <= top; b++) {
                        for (int c = b + 1; c <= top; c++) {
                            if (a * a + b * b == c * c) {
                                result.add(new PythagoreanTriplet(a, b, c));
                            }
                        }
                    }
                }
            }
            return result;
        }
    }
}