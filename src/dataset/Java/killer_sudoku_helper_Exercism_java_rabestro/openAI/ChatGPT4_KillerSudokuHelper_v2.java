import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class KillerSudokuHelper {
    public static List<List<Integer>> combinationsInCage(Integer cageSum, Integer cageSize, Collection<Integer> exclude) {
        return new CombinationGenerator(new HashSet<>(exclude)).findCombinations(cageSum, cageSize);
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

            for (int digit = currentStartDigit; digit <= MAX_DIGIT - remainingSize + 1; digit++) {
                if (excludedDigits.contains(digit) || digit > remainingSum) {
                    continue;
                }
                currentCombination.add(digit);
                generateRecursive(digit + 1, remainingSum - digit, remainingSize - 1, currentCombination, results);
                currentCombination.remove(currentCombination.size() - 1);
            }
        }
    }
}