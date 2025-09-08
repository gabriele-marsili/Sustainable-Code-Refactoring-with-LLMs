public class SalaryCalculator {

    private static final int MAX_SKIPPED_DAYS_WITHOUT_PENALTY = 4;
    private static final double SKIPPED_DAYS_PENALTY = 0.15;
    private static final double SALARY_MULTIPLIER_WITH_PENALTY = 1.0 - SKIPPED_DAYS_PENALTY;

    private static final int MIN_SOLD_FOR_EXTRA_BONUS = 20;
    private static final int BASIC_BONUS = 10;
    private static final int EXTRA_BONUS = 13;

    private static final double BASE_SALARY = 1000.00;
    private static final double MAX_SALARY = 2000.00;

    public double salaryMultiplier(int daysSkipped) {
        return daysSkipped > MAX_SKIPPED_DAYS_WITHOUT_PENALTY ? SALARY_MULTIPLIER_WITH_PENALTY : 1.0;
    }

    public int bonusMultiplier(int productsSold) {
        return productsSold >= MIN_SOLD_FOR_EXTRA_BONUS ? EXTRA_BONUS : BASIC_BONUS;
    }

    public double bonusForProductsSold(int productsSold) {
        return productsSold * (productsSold >= MIN_SOLD_FOR_EXTRA_BONUS ? EXTRA_BONUS : BASIC_BONUS);
    }

    public double finalSalary(int daysSkipped, int productsSold) {
        double multiplier = daysSkipped > MAX_SKIPPED_DAYS_WITHOUT_PENALTY ? SALARY_MULTIPLIER_WITH_PENALTY : 1.0;
        double bonus = productsSold * (productsSold >= MIN_SOLD_FOR_EXTRA_BONUS ? EXTRA_BONUS : BASIC_BONUS);
        double calculatedSalary = BASE_SALARY * multiplier + bonus;
        return Math.min(calculatedSalary, MAX_SALARY);
    }
}