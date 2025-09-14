import java.util.ArrayList;
import java.util.List;

public class PythagoreanTriplet {
    private final int a, b, c;
    private final int sum;
    private final long product;

    public PythagoreanTriplet(int a, int b, int c) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.sum = a + b + c;
        this.product = (long) a * b * c;
    }

    int calculateSum() {
        return sum;
    }

    long calculateProduct() {
        return product;
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
            
            for (int a = bottom; a <= top; a++) {
                int aSquared = a * a;
                for (int b = a + 1; b <= top; b++) {
                    int bSquared = b * b;
                    int cSquared = aSquared + bSquared;
                    int c = (int) Math.sqrt(cSquared);
                    
                    if (c * c == cSquared && c > b && c <= top) {
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