import change.AmountToChangeFunction;
import change.OptimalAlgorithm;

import java.util.List;

final class ChangeCalculator {
    private final AmountToChangeFunction amountToChangeFunction;

    public ChangeCalculator(List<Integer> denominations) {
        amountToChangeFunction = new OptimalAlgorithm(denominations);
    }

    public List<Integer> computeMostEfficientChange(int amount) {
        validateAmount(amount);
        return amountToChangeFunction.apply(amount);
    }

    private void validateAmount(int amount) {
        if (amount < 0) {
            throw new IllegalArgumentException("Negative totals are not allowed.");
        }
    }
}