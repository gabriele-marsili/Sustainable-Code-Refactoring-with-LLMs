import java.util.stream.IntStream;

class NaturalNumber {
    private final Classification classification;

    NaturalNumber(int number) {
        if (number < 1) throw new IllegalArgumentException("You must supply a natural number (positive integer)");

        classification = classify(number);
    }

    Classification getClassification() {
        return classification;
    }

    private Classification classify(int number) {
        var aliquotSum = IntStream.rangeClosed(1, number / 2).parallel().filter(n -> number % n == 0).sum();

        if (aliquotSum == number) return Classification.PERFECT;
        if (number < aliquotSum) return Classification.ABUNDANT;
        return Classification.DEFICIENT;
    }
}
