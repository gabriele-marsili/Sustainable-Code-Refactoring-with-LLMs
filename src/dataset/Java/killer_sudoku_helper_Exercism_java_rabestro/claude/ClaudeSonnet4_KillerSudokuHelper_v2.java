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

    private record CombinationGenerator(Set<Integer> excludedDigits) {
        private static final int MAX_DIGIT = 9;

        List<List<Integer>> findCombinations(int sum, int size) {
            List<List<Integer>> result = new ArrayList<>();
            List<Integer> current = new ArrayList<>(size);
            generateRecursive(1, sum, size, current, result);
            return result;
        }

        private void generateRecursive(int currentStartDigit, int remainingSum, int remainingSize, 
                                     List<Integer> current, List<List<Integer>> result) {
            if (remainingSize == 1) {
                if (currentStartDigit <= remainingSum && remainingSum <= MAX_DIGIT && 
                    (excludedDigits == null || !excludedDigits.contains(remainingSum))) {
                    current.add(remainingSum);
                    result.add(new ArrayList<>(current));
                    current.remove(current.size() - 1);
                }
                return;
            }
            
            int maxPossibleFirstDigit = Math.min(MAX_DIGIT - remainingSize + 1, remainingSum - remainingSize + 1);
            for (int digit = currentStartDigit; digit <= maxPossibleFirstDigit; digit++) {
                if (excludedDigits == null || !excludedDigits.contains(digit)) {
                    current.add(digit);
                    generateRecursive(digit + 1, remainingSum - digit, remainingSize - 1, current, result);
                    current.remove(current.size() - 1);
                }
            }
        }
    }
}