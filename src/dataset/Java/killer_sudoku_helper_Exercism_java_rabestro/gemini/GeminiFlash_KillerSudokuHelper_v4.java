import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.IntStream;

public class KillerSudokuHelper {
    public static List<List<Integer>> combinationsInCage(Integer cageSum, Integer cageSize, Collection<Integer> exclude) {
        return new CombinationGenerator(exclude).findCombinations(cageSum, cageSize);
    }

    public static List<List<Integer>> combinationsInCage(Integer cageSum, Integer cageSize) {
        return combinationsInCage(cageSum, cageSize, Set.of());
    }

    private static class CombinationGenerator {
        private final boolean[] excludedDigits;
        private static final int MAX_DIGIT = 9;

        public CombinationGenerator(Collection<Integer> excluded) {
            this.excludedDigits = new boolean[MAX_DIGIT + 1];
            for (Integer digit : excluded) {
                if (digit >= 1 && digit <= MAX_DIGIT) {
                    this.excludedDigits[digit] = true;
                }
            }
        }

        List<List<Integer>> findCombinations(int sum, int size) {
            List<List<Integer>> result = new ArrayList<>();
            findCombinationsRecursive(1, sum, size, new ArrayList<>(), result);
            return result;
        }

        private void findCombinationsRecursive(int currentStartDigit, int remainingSum, int remainingSize, List<Integer> currentCombination, List<List<Integer>> result) {
            if (remainingSize == 0) {
                if (remainingSum == 0) {
                    result.add(new ArrayList<>(currentCombination));
                }
                return;
            }

            if (remainingSize == 1) {
                if (currentStartDigit <= remainingSum && remainingSum <= MAX_DIGIT && !excludedDigits[remainingSum]) {
                    List<Integer> combination = new ArrayList<>(currentCombination);
                    combination.add(remainingSum);
                    result.add(combination);
                }
                return;
            }

            int maxPossibleFirstDigit = MAX_DIGIT - remainingSize + 1;
            for (int digit = currentStartDigit; digit <= maxPossibleFirstDigit; ++digit) {
                if (!excludedDigits[digit]) {
                    currentCombination.add(digit);
                    findCombinationsRecursive(digit + 1, remainingSum - digit, remainingSize - 1, currentCombination, result);
                    currentCombination.remove(currentCombination.size() - 1); // Backtrack
                }
            }
        }
    }
}