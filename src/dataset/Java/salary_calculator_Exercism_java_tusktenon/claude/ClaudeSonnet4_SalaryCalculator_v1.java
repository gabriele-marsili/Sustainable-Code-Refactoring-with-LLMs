public class SalaryCalculator {
  private static final int daysSkippedAllowance = 5;
  private static final double daysSkippedPenalty = 0.15;
  private static final double salaryMultiplierReduced = 0.85; // 1 - 0.15
  private static final int baseBonusMultiplier = 10;
  private static final int improvedBonusMultiplier = 13;
  private static final int improvedBonusMinimumProducts = 20;
  private static final double baseSalary = 1000;
  private static final double salaryCap = 2000;

  public double salaryMultiplier(int daysSkipped) {
    return daysSkipped >= daysSkippedAllowance ? salaryMultiplierReduced : 1.0;
  }

  public int bonusMultiplier(int productsSold) {
    return productsSold >= improvedBonusMinimumProducts
        ? improvedBonusMultiplier
        : baseBonusMultiplier;
  }

  public double bonusForProductsSold(int productsSold) {
    return productsSold * (productsSold >= improvedBonusMinimumProducts
        ? improvedBonusMultiplier
        : baseBonusMultiplier);
  }

  public double finalSalary(int daysSkipped, int productsSold) {
    final double multiplier = daysSkipped >= daysSkippedAllowance ? salaryMultiplierReduced : 1.0;
    final int bonus = productsSold * (productsSold >= improvedBonusMinimumProducts
        ? improvedBonusMultiplier
        : baseBonusMultiplier);
    final double calculatedSalary = baseSalary * multiplier + bonus;
    return calculatedSalary > salaryCap ? salaryCap : calculatedSalary;
  }
}