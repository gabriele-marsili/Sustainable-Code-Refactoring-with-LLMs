public class SalaryCalculator {
  private static final int DAYS_SKIPPED_ALLOWANCE = 5;
  private static final double DAYS_SKIPPED_PENALTY = 0.15;
  private static final int BASE_BONUS_MULTIPLIER = 10;
  private static final int IMPROVED_BONUS_MULTIPLIER = 13;
  private static final int IMPROVED_BONUS_MINIMUM_PRODUCTS = 20;
  private static final double BASE_SALARY = 1000;
  private static final double SALARY_CAP = 2000;

  public double salaryMultiplier(int daysSkipped) {
    return daysSkipped < DAYS_SKIPPED_ALLOWANCE ? 1.0 : 1 - DAYS_SKIPPED_PENALTY;
  }

  public int bonusMultiplier(int productsSold) {
    return productsSold < IMPROVED_BONUS_MINIMUM_PRODUCTS 
        ? BASE_BONUS_MULTIPLIER 
        : IMPROVED_BONUS_MULTIPLIER;
  }

  public double bonusForProductsSold(int productsSold) {
    return productsSold * (productsSold < IMPROVED_BONUS_MINIMUM_PRODUCTS 
        ? BASE_BONUS_MULTIPLIER 
        : IMPROVED_BONUS_MULTIPLIER);
  }

  public double finalSalary(int daysSkipped, int productsSold) {
    double calculatedSalary = BASE_SALARY * salaryMultiplier(daysSkipped) + bonusForProductsSold(productsSold);
    return calculatedSalary > SALARY_CAP ? SALARY_CAP : calculatedSalary;
  }
}