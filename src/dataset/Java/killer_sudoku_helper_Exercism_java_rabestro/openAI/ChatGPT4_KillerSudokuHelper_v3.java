import java.util.*;
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
            List<List<Integer>> result = new ArrayList<>();
            generateRecursive(1, sum, size, new ArrayDeque<>(), result);
            return result;
        }

        private void generateRecursive(int currentStartDigit, int remainingSum, int remainingSize, Deque<Integer> currentCombination, List<List<Integer>> result) {
            if (remainingSize == 1) {
                if (currentStartDigit <= remainingSum && remainingSum <= MAX_DIGIT && !excludedDigits.contains(remainingSum)) {
                    currentCombination.addLast(remainingSum);
                    result.add(new ArrayList<>(currentCombination));
                    currentCombination.removeLast();
                }
                return;
            }
            int maxPossibleFirstDigit = MAX_DIGIT - remainingSize + 1;
            for (int digit = currentStartDigit; digit <= maxPossibleFirstDigit; digit++) {
                if (!excludedDigits.contains(digit)) {
                    currentCombination.addLast(digit);
                    generateRecursive(digit + 1, remainingSum - digit, remainingSize - 1, currentCombination, result);
                    currentCombination.removeLast();
                }
            }
        }
    }
}