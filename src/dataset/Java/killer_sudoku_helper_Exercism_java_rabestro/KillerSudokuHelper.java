import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.IntStream;
import java.util.stream.Stream;

import static java.util.function.Predicate.not;

public class KillerSudokuHelper {
    public static List<List<Integer>> combinationsInCage(Integer cageSum, Integer cageSize, Collection<Integer> exclude) {
        return new CombinationGenerator(Set.copyOf(exclude)).findCombinations(cageSum, cageSize);
    }

    public static List<List<Integer>> combinationsInCage(Integer cageSum, Integer cageSize) {
        return combinationsInCage(cageSum, cageSize, Set.of());
    }

    private record CombinationGenerator(Set<Integer> excludedDigits) {
        private static final int MAX_DIGIT = 9;

        List<List<Integer>> findCombinations(int sum, int size) {
            return generateRecursive(1, sum, size)
                    .map(IntStream::boxed)
                    .map(Stream::toList)
                    .toList();
        }

        private Stream<IntStream> generateRecursive(int currentStartDigit, int remainingSum, int remainingSize) {
            if (remainingSize == 1) {
                return (currentStartDigit <= remainingSum && remainingSum <= MAX_DIGIT && !excludedDigits.contains(remainingSum))
                        ? Stream.of(IntStream.of(remainingSum))
                        : Stream.empty();
            }
            int maxPossibleFirstDigit =  MAX_DIGIT - remainingSize + 1;
            return IntStream.rangeClosed(currentStartDigit, maxPossibleFirstDigit)
                    .boxed()
                    .filter(not(excludedDigits::contains))
                    .flatMap(digit -> generateRecursive(digit + 1, remainingSum - digit, remainingSize - 1)
                            .map(s -> IntStream.concat(IntStream.of(digit), s)));
        }
    }
}
