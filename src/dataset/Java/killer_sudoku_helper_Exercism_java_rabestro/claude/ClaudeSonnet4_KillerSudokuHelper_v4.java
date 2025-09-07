import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;

public class KillerSudokuHelper {
    public static List<List<Integer>> combinationsInCage(Integer cageSum, Integer cageSize, Collection<Integer> exclude) {
        return new CombinationGenerator(exclude.isEmpty() ? null : Set.copyOf(exclude)).findCombinations(cageSum, cageSize);
    }

    public static List<List<Integer>> combinationsInCage(Integer cageSum, Integer cageSize) {
        return new CombinationGenerator(null).findCombinations(cageSum, cageSize);
    }

    private static final class CombinationGenerator {
        private static final int MAX_DIGIT = 9;
        private final Set<Integer> excludedDigits;

        CombinationGenerator(Set<Integer> excludedDigits) {
            this.excludedDigits = excludedDigits;
        }

        List<List<Integer>> findCombinations(int sum, int size) {
            List<List<Integer>> result = new ArrayList<>();
            int[] combination = new int[size];
            generateRecursive(1, sum, size, 0, combination, result);
            return result;
        }

        private void generateRecursive(int currentStartDigit, int remainingSum, int remainingSize, 
                                     int index, int[] combination, List<List<Integer>> result) {
            if (remainingSize == 1) {
                if (currentStartDigit <= remainingSum && remainingSum <= MAX_DIGIT && 
                    (excludedDigits == null || !excludedDigits.contains(remainingSum))) {
                    combination[index] = remainingSum;
                    List<Integer> validCombination = new ArrayList<>(index + 1);
                    for (int i = 0; i <= index; i++) {
                        validCombination.add(combination[i]);
                    }
                    result.add(validCombination);
                }
                return;
            }

            int maxPossibleFirstDigit = Math.min(MAX_DIGIT - remainingSize + 1, remainingSum - remainingSize + 1);
            for (int digit = currentStartDigit; digit <= maxPossibleFirstDigit; digit++) {
                if (excludedDigits == null || !excludedDigits.contains(digit)) {
                    combination[index] = digit;
                    generateRecursive(digit + 1, remainingSum - digit, remainingSize - 1, 
                                    index + 1, combination, result);
                }
            }
        }
    }
}