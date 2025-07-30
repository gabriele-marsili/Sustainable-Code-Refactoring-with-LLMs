public class SalaryCalculator {
  private static final int daysSkippedAllowance = 5;
  private static final double daysSkippedPenalty = 0.15;
  private static final int baseBonusMultiplier = 10;
  private static final int improvedBonusMultiplier = 13;
  private static final int improvedBonusMinimumProducts = 20;
  private static final double baseSalary = 1000;
  private static final double salaryCap = 2000;

  public double salaryMultiplier(int daysSkipped) {
    return daysSkipped >= daysSkippedAllowance ? 1 - daysSkippedPenalty : 1.0;
  }

  public int bonusMultiplier(int productsSold) {
    return productsSold >= improvedBonusMinimumProducts
        ? improvedBonusMultiplier
        : baseBonusMultiplier;
  }

  public double bonusForProductsSold(int productsSold) {
    return productsSold * bonusMultiplier(productsSold);
  }

  public double finalSalary(int daysSkipped, int productsSold) {
    final var calculatedSalary =
        baseSalary * salaryMultiplier(daysSkipped) + bonusForProductsSold(productsSold);
    return Math.min(calculatedSalary, salaryCap);
  }
}
