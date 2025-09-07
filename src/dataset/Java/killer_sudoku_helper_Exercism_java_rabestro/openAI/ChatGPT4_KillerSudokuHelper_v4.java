import java.util.*;
import java.util.stream.IntStream;

public class KillerSudokuHelper {
    public static List<List<Integer>> combinationsInCage(Integer cageSum, Integer cageSize, Collection<Integer> exclude) {
        return new CombinationGenerator(Set.copyOf(exclude)).findCombinations(cageSum, cageSize);
    }

    public static List<List<Integer>> combinationsInCage(Integer cageSum, Integer cageSize) {
        return combinationsInCage(cageSum, cageSize, Set.of());
    }

    private static class CombinationGenerator {
        private static final int MAX_DIGIT = 9;
        private final Set<Integer> excludedDigits;

        CombinationGenerator(Set<Integer> excludedDigits) {
            this.excludedDigits = excludedDigits;
        }

        List<List<Integer>> findCombinations(int sum, int size) {
            List<List<Integer>> result = new ArrayList<>();
            generateRecursive(1, sum, size, new ArrayList<>(), result);
            return result;
        }

        private void generateRecursive(int currentStartDigit, int remainingSum, int remainingSize, List<Integer> currentCombination, List<List<Integer>> result) {
            if (remainingSize == 1) {
                if (currentStartDigit <= remainingSum && remainingSum <= MAX_DIGIT && !excludedDigits.contains(remainingSum)) {
                    currentCombination.add(remainingSum);
                    result.add(new ArrayList<>(currentCombination));
                    currentCombination.remove(currentCombination.size() - 1);
                }
                return;
            }

            int maxPossibleFirstDigit = MAX_DIGIT - remainingSize + 1;
            for (int digit = currentStartDigit; digit <= maxPossibleFirstDigit; digit++) {
                if (!excludedDigits.contains(digit)) {
                    currentCombination.add(digit);
                    generateRecursive(digit + 1, remainingSum - digit, remainingSize - 1, currentCombination, result);
                    currentCombination.remove(currentCombination.size() - 1);
                }
            }
        }
    }
}