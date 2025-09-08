public class SalaryCalculator {
  private static final int DAYS_SKIPPED_ALLOWANCE = 5;
  private static final double DAYS_SKIPPED_PENALTY = 0.15;
  private static final double PENALTY_MULTIPLIER = 0.85; // 1 - 0.15
  private static final int BASE_BONUS_MULTIPLIER = 10;
  private static final int IMPROVED_BONUS_MULTIPLIER = 13;
  private static final int IMPROVED_BONUS_MINIMUM_PRODUCTS = 20;
  private static final double BASE_SALARY = 1000.0;
  private static final double SALARY_CAP = 2000.0;

  public double salaryMultiplier(int daysSkipped) {
    return daysSkipped >= DAYS_SKIPPED_ALLOWANCE ? PENALTY_MULTIPLIER : 1.0;
  }

  public int bonusMultiplier(int productsSold) {
    return productsSold >= IMPROVED_BONUS_MINIMUM_PRODUCTS
        ? IMPROVED_BONUS_MULTIPLIER
        : BASE_BONUS_MULTIPLIER;
  }

  public double bonusForProductsSold(int productsSold) {
    return productsSold * (productsSold >= IMPROVED_BONUS_MINIMUM_PRODUCTS
        ? IMPROVED_BONUS_MULTIPLIER
        : BASE_BONUS_MULTIPLIER);
  }

  public double finalSalary(int daysSkipped, int productsSold) {
    final double salaryComponent = BASE_SALARY * 
        (daysSkipped >= DAYS_SKIPPED_ALLOWANCE ? PENALTY_MULTIPLIER : 1.0);
    final double bonusComponent = productsSold * 
        (productsSold >= IMPROVED_BONUS_MINIMUM_PRODUCTS
            ? IMPROVED_BONUS_MULTIPLIER
            : BASE_BONUS_MULTIPLIER);
    final double calculatedSalary = salaryComponent + bonusComponent;
    return calculatedSalary > SALARY_CAP ? SALARY_CAP : calculatedSalary;
  }
}