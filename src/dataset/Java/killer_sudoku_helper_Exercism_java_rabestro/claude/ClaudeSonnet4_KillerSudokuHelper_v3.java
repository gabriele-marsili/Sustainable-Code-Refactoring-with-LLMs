import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;

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
            if (size <= 0 || sum <= 0 || sum > MAX_DIGIT * size || sum < size) {
                return List.of();
            }
            
            List<List<Integer>> result = new ArrayList<>();
            int[] combination = new int[size];
            generateCombinations(1, sum, size, 0, combination, result);
            return result;
        }

        private void generateCombinations(int start, int remainingSum, int remainingSize, int index, int[] combination, List<List<Integer>> result) {
            if (remainingSize == 0) {
                if (remainingSum == 0) {
                    List<Integer> validCombination = new ArrayList<>(index);
                    for (int i = 0; i < index; i++) {
                        validCombination.add(combination[i]);
                    }
                    result.add(validCombination);
                }
                return;
            }

            int maxDigit = Math.min(MAX_DIGIT, remainingSum - remainingSize + 1);
            for (int digit = start; digit <= maxDigit; digit++) {
                if (!excludedDigits.contains(digit)) {
                    combination[index] = digit;
                    generateCombinations(digit + 1, remainingSum - digit, remainingSize - 1, index + 1, combination, result);
                }
            }
        }
    }
}