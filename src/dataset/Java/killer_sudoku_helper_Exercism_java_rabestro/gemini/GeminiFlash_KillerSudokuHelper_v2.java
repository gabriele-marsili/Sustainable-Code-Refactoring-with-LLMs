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
        private static final int MAX_DIGIT = 9;
        private final Set<Integer> excludedDigits;

        public CombinationGenerator(Collection<Integer> excludedDigits) {
            this.excludedDigits = Set.copyOf(excludedDigits);
        }

        public List<List<Integer>> findCombinations(int sum, int size) {
            List<List<Integer>> results = new ArrayList<>();
            generateRecursive(1, sum, size, new ArrayList<>(), results);
            return results;
        }

        private void generateRecursive(int currentStartDigit, int remainingSum, int remainingSize, List<Integer> currentCombination, List<List<Integer>> results) {
            if (remainingSize == 0) {
                if (remainingSum == 0) {
                    results.add(new ArrayList<>(currentCombination));
                }
                return;
            }

            if (remainingSize == 1) {
                if (currentStartDigit <= remainingSum && remainingSum <= MAX_DIGIT && !excludedDigits.contains(remainingSum)) {
                    List<Integer> combination = new ArrayList<>(currentCombination);
                    combination.add(remainingSum);
                    results.add(combination);
                }
                return;
            }

            int maxPossibleFirstDigit = Math.min(MAX_DIGIT, remainingSum - remainingSize + 1);

            for (int digit = currentStartDigit; digit <= maxPossibleFirstDigit; digit++) {
                if (!excludedDigits.contains(digit)) {
                    currentCombination.add(digit);
                    generateRecursive(digit + 1, remainingSum - digit, remainingSize - 1, currentCombination, results);
                    currentCombination.remove(currentCombination.size() - 1); // Backtrack
                }
            }
        }
    }
}