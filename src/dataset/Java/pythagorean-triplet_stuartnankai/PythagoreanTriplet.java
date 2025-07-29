import java.util.ArrayList;
import java.util.List;

public class PythagoreanTriplet {
    private int a,b,c;



    public PythagoreanTriplet(int a, int b, int c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    int calculateSum(){
        return a+b+c;
    }

    long calculateProduct(){
        return a*b*c;
    }

    boolean isPythagorean(){

        return Math.pow(a,2)+Math.pow(b,2)==Math.pow(c,2);
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
            List<PythagoreanTriplet> result = new ArrayList<PythagoreanTriplet>();
            for (int a = bottom; a <= top; a++) {
                for (int b = a + 1; b <= top; b++) {
                    for (int c = b + 1; c <= top; c++) {
                        PythagoreanTriplet pt = new PythagoreanTriplet(a, b, c);
                        if (pt.isPythagorean() && (sum == null || pt.calculateSum() == sum)) {
                            result.add(pt);
                        }
                    }
                }
            }
            return result;
        }
    }
}
