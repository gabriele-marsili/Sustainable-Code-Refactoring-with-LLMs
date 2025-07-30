import java.util.Arrays;
import java.util.stream.IntStream;

public record SumOfMultiples(int level, int[] baseValues) {
    private IntStream multiples(int factor) {
        return IntStream.iterate(factor, i -> i < level, i -> i + factor);
    }

    public int getSum() {
        return Arrays
                .stream(baseValues)
                .filter(baseValue -> baseValue > 0)
                .flatMap(this::multiples)
                .distinct()
                .sum();
    }
}
